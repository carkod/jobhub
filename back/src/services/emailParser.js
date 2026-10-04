import mongoose from "mongoose";
import { ApplicationSchema, EmailScanCacheSchema } from "../Schemas.js";
import { cleanQueryString, escapeRegex } from "../utils.js";
import GeminiApi from "./GeminiApi.js";
import GmailApi from "./GmailApi.js";

// Bump this when the classification or extraction policy changes so old
// classifications are reconsidered on the next scan.
const EMAIL_SCAN_VERSION = 1;

const decodeEmailPart = (data) =>
  Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
    "utf-8",
  );

const stripHtml = (html) =>
  html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();

const collectBodyParts = (part, type) => {
  if (!part) return [];
  const parts = [];
  if (part.mimeType === type && part.body?.data) {
    parts.push(decodeEmailPart(part.body.data));
  }
  for (const child of part.parts || []) {
    parts.push(...collectBodyParts(child, type));
  }
  return parts;
};

const extractMessageText = (payload) => {
  const plainText = collectBodyParts(payload, "text/plain").join("\n").trim();
  if (plainText) return plainText;
  return stripHtml(collectBodyParts(payload, "text/html").join("\n"));
};

const applicationStatuses = {
  applied: 0,
  "in progress": 1,
  rejected: 2,
  success: 3,
};

const normalizeApplicationStatus = (status) => {
  const normalized = String(status || "applied")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ");
  const text = Object.hasOwn(applicationStatuses, normalized)
    ? normalized
    : "applied";
  return { text, value: applicationStatuses[text] };
};

const nonEmptyString = (value) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

export default class EmailParser {
  constructor(access_token, limit = 300) {
    this.access_token = access_token;
    this.limit = limit;
    this.gmailApi = new GmailApi(access_token, limit);
    this.geminiApi = new GeminiApi();
    this.ApplicationModel = mongoose.model(
      "ApplicationModel",
      ApplicationSchema,
    );
    this.EmailScanCacheModel = mongoose.model(
      "EmailScanCacheModel",
      EmailScanCacheSchema,
    );
    this.reviewQueue = [];
    this.mailbox = null;
  }

  async getMailbox() {
    if (!this.mailbox) {
      const profile = await this.gmailApi.fetchProfile();
      if (!profile?.emailAddress) {
        throw new Error("Gmail profile did not include an email address");
      }
      this.mailbox = profile.emailAddress.toLowerCase();
    }
    return this.mailbox;
  }

  async getCachedScan(messageId) {
    const mailbox = await this.getMailbox();
    const cached = await this.EmailScanCacheModel.findOne({
      mailbox,
      messageId,
    }).lean();
    if (
      cached?.version !== EMAIL_SCAN_VERSION ||
      cached?.model !== this.geminiApi.getEmailModelName()
    ) {
      return null;
    }
    return cached;
  }

  async cacheClassification(messageId, classification, resultStatus) {
    const mailbox = await this.getMailbox();
    await this.EmailScanCacheModel.replaceOne(
      { mailbox, messageId },
      {
        mailbox,
        messageId,
        version: EMAIL_SCAN_VERSION,
        model: this.geminiApi.getEmailModelName(),
        classification,
        resultStatus,
      },
      { upsert: true },
    );
  }

  async matchApplication(extraction, threadId) {
    const cleanThreadId = cleanQueryString(threadId);
    if (cleanThreadId) {
      const byThread = await this.ApplicationModel.findOne({
        threadId: cleanThreadId,
      });
      if (byThread)
        return { application: byThread, confidence: 1, strategy: "threadId" };
    }

    const cleanCompany = cleanQueryString(extraction.company);
    if (cleanCompany) {
      const byCompany = await this.ApplicationModel.findOne({
        company: cleanCompany,
      });
      if (byCompany)
        return {
          application: byCompany,
          confidence: 0.95,
          strategy: "exact company",
        };
    }

    const cleanJobTitle = cleanQueryString(extraction.job_title);
    if (cleanJobTitle) {
      const byTitle = await this.ApplicationModel.findOne({
        role: cleanJobTitle,
      });
      if (byTitle)
        return {
          application: byTitle,
          confidence: 0.92,
          strategy: "exact title",
        };

      const fuzzyToken = escapeRegex(cleanJobTitle.split(" ")[0]);
      const fuzzy = await this.ApplicationModel.findOne({
        role: { $regex: fuzzyToken, $options: "i" },
      });
      if (fuzzy)
        return {
          application: fuzzy,
          confidence: 0.9,
          strategy: "fuzzy title similarity",
        };
    }

    return { application: null, confidence: 0, strategy: "none" };
  }

  async guardedUpsert({ extraction, date, emailId, threadId, match }) {
    if (!(extraction.confidence >= 0.85 && match.confidence >= 0.9)) {
      this.reviewQueue.push({ emailId, extraction, match });
      return { status: "review" };
    }

    const existing = match.application;
    const payload = {
      role:
        nonEmptyString(extraction.job_title) || existing?.role || "",
      company:
        nonEmptyString(extraction.company) || existing?.company || "",
      location:
        nonEmptyString(extraction.location) || existing?.location || "",
      applicationUrl:
        nonEmptyString(extraction.application_link) ||
        existing?.applicationUrl ||
        "",
      updatedAt: new Date(date || Date.now()),
      status: normalizeApplicationStatus(
        nonEmptyString(extraction.status) || existing?.status?.text,
      ),
      description:
        nonEmptyString(extraction.job_requirements) ||
        existing?.description ||
        "",
      emailId,
      threadId,
    };

    if (match.application) {
      await this.ApplicationModel.updateOne(
        { _id: match.application._id },
        payload,
      );
      return { status: "updated" };
    }

    await this.ApplicationModel.create({
      _id: mongoose.Types.ObjectId(),
      ...payload,
      salary: "",
      contacts: [],
      files: [],
      stages: [],
      createdAt: new Date(date || Date.now()),
    });
    return { status: "created" };
  }

  async parseMessage(messageId) {
    const cached = await this.getCachedScan(messageId);
    if (cached?.resultStatus) {
      return {
        messageId,
        status: cached.resultStatus,
        classification: cached.classification,
        extraction: cached.extraction,
        cached: true,
      };
    }

    const email = await this.gmailApi.fetchIndividualEmail(messageId);
    const headers = email?.payload?.headers || [];
    const subject =
      headers.find((h) => h.name.toLowerCase() === "subject")?.value || "";
    const date = headers.find((h) => h.name.toLowerCase() === "date")?.value;
    const threadId = email.threadId;
    const snippet = email.snippet || "";
    const text = extractMessageText(email?.payload);

    if (!subject && !snippet && !text) {
      return { messageId, status: "skipped_empty" };
    }

    const classification =
      cached?.classification ||
      (await this.geminiApi.classifyEmail({ subject, snippet, text }));
    if (
      typeof classification?.is_job_related !== "boolean" ||
      typeof classification.confidence !== "number" ||
      classification.confidence < 0 ||
      classification.confidence > 1
    ) {
      throw new Error("Gemini returned an invalid email classification");
    }
    const jobRelated =
      classification?.is_job_related === true &&
      classification.confidence >= 0.8;
    if (!cached?.classification) {
      await this.cacheClassification(
        messageId,
        classification,
        jobRelated ? undefined : "skipped_classification",
      );
    }
    if (!jobRelated) {
      return {
        messageId,
        status: "skipped_classification",
        classification,
      };
    }

    const extraction =
      cached?.extraction ||
      (await this.geminiApi.extractJobData({ subject, snippet, text }));
    if (!cached?.extraction) {
      await this.EmailScanCacheModel.updateOne(
        { mailbox: await this.getMailbox(), messageId },
        { $set: { extraction } },
      );
    }
    const match = await this.matchApplication(extraction, threadId);
    const writeResult = await this.guardedUpsert({
      extraction,
      date,
      emailId: messageId,
      threadId,
      match,
    });
    if (writeResult.status === "created" || writeResult.status === "updated") {
      await this.EmailScanCacheModel.updateOne(
        { mailbox: await this.getMailbox(), messageId },
        { $set: { resultStatus: writeResult.status } },
      );
    }

    return {
      messageId,
      status: writeResult.status,
      classification,
      extraction,
      match,
    };
  }

  async runPipeline({ lastHistoryId = null, pubSubPayload = null } = {}) {
    let messageIds = [];
    let nextHistoryId = lastHistoryId;

    const decoded = this.gmailApi.decodePubSubMessage(pubSubPayload);
    const notificationHistoryId = decoded?.historyId || null;

    if (lastHistoryId) {
      const historyResult = await this.gmailApi.fetchHistory(lastHistoryId);
      messageIds = this.gmailApi.extractMessageIdsFromHistory(
        historyResult.history,
      );
      nextHistoryId =
        historyResult.historyId || notificationHistoryId || lastHistoryId;
    } else {
      const messages = await this.gmailApi.fetchListEmails();
      messageIds = messages.map((m) => m.id);
      nextHistoryId = notificationHistoryId || nextHistoryId;
    }

    const processed = [];
    for (const messageId of messageIds) {
      processed.push(await this.parseMessage(messageId));
    }

    return {
      processed,
      lastHistoryId: nextHistoryId,
      reviewQueue: this.reviewQueue,
    };
  }
}
