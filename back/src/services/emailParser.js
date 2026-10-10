import mongoose from "mongoose";
import { ApplicationSchema, EmailScanCacheSchema } from "../Schemas.js";
import { cleanQueryString, escapeRegex } from "../utils.js";
import GeminiApi from "./GeminiApi.js";
import GmailApi from "./GmailApi.js";
import { logger } from "../requestLogger.js";

// Bump this when the classification or extraction policy changes so old
// classifications are reconsidered on the next scan.
const EMAIL_SCAN_VERSION = 1;

// Gmail already sorts bulk mail into these tabs. Recruitment mail is never marketing.
const SCAN_QUERY = "-category:promotions -category:social -category:forums";

// How many emails are fetched and sent to Gemini at the same time.
const SCAN_CONCURRENCY = 5;

// Only the start of the body is needed to decide if an email is about a job.
const CLASSIFY_TEXT_LIMIT = 2000;

// An email with none of these words in its sender, subject or snippet is skipped
// without a Gemini call. Keep the list broad: a false match costs one Gemini call,
// a false miss hides a real application email.
const JOB_KEYWORDS =
  /\b(?:appl(?:y|ied|ies|ying|ication|ications|icant)|interview\w*|recruit\w*|candidate\w*|position|role|job|jobs|vacanc\w*|career\w*|hiring|hired?|offer|cv|resume|opportunit\w*|talent|shortlist\w*|assessment|screening|next steps|moving forward|your interest|unfortunately|greenhouse|lever|workday|ashby|smartrecruiters|workable|icims)\b/i;

const PREFILTER_CLASSIFICATION = {
  is_job_related: false,
  confidence: 1,
  reason: "No recruitment keywords in sender, subject or snippet",
};

const isJobRelated = (classification) =>
  classification?.is_job_related === true && classification.confidence >= 0.8;

const mapWithConcurrency = async (items, limit, worker) => {
  const results = new Array(items.length);
  let next = 0;
  let failed = false;
  const run = async () => {
    while (!failed && next < items.length) {
      const index = next++;
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, run),
  );
  return results;
};

const getHeader = (headers, name) =>
  headers.find((h) => h.name.toLowerCase() === name)?.value || "";

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

  async guardedUpsert({
    extraction,
    date,
    emailId,
    threadId,
    match,
    updateOnly = false,
  }) {
    const existing = match.application;
    if (
      !(extraction.confidence >= 0.85) ||
      (existing && !(match.confidence >= 0.9)) ||
      (!existing && (updateOnly || !nonEmptyString(extraction.company)))
    ) {
      this.reviewQueue.push({ emailId, extraction, match });
      return { status: "review" };
    }

    const parsedDate = new Date(date || Date.now());
    const emailDate = Number.isNaN(parsedDate.getTime())
      ? new Date()
      : parsedDate;
    if (existing?.lastEmailAt && new Date(existing.lastEmailAt) >= emailDate) {
      return { status: "skipped_older_email" };
    }

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
      lastEmailAt: emailDate,
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
      createdAt: emailDate,
    });
    return { status: "created" };
  }

  // Fetches, classifies and extracts one email. It does not write applications,
  // so many emails can run at the same time. Returns { result } when the email is
  // finished, or { pending } when applyMessage must write it.
  async analyzeMessage(messageId, { updateOnly = false } = {}) {
    const cached = await this.getCachedScan(messageId);
    if (cached?.resultStatus && !updateOnly) {
      return {
        result: {
          messageId,
          status: cached.resultStatus,
          classification: cached.classification,
          extraction: cached.extraction,
          cached: true,
        },
      };
    }
    if (cached?.classification && !isJobRelated(cached.classification)) {
      return {
        result: {
          messageId,
          status: "skipped_classification",
          classification: cached.classification,
          cached: true,
        },
      };
    }

    let classification = cached?.classification;

    if (!classification) {
      // Metadata is small. It has no body, so it is cheap to fetch.
      const metadata = await this.gmailApi.fetchEmailMetadata(messageId);
      const metaHeaders = metadata?.payload?.headers || [];
      const subject = getHeader(metaHeaders, "subject");
      const from = getHeader(metaHeaders, "from");
      const snippet = metadata?.snippet || "";
      if (!subject && !snippet) {
        return { result: { messageId, status: "skipped_empty" } };
      }
      if (!JOB_KEYWORDS.test(`${from} ${subject} ${snippet}`)) {
        await this.cacheClassification(
          messageId,
          PREFILTER_CLASSIFICATION,
          "skipped_classification",
        );
        return {
          result: {
            messageId,
            status: "skipped_classification",
            classification: PREFILTER_CLASSIFICATION,
          },
        };
      }
    }

    const email = await this.gmailApi.fetchIndividualEmail(messageId);
    const headers = email?.payload?.headers || [];
    const subject = getHeader(headers, "subject");
    const headerDate = getHeader(headers, "date") || undefined;
    const date = email.internalDate
      ? new Date(Number(email.internalDate))
      : headerDate;
    const threadId = email.threadId;
    const snippet = email.snippet || "";
    const text = extractMessageText(email?.payload);

    if (!subject && !snippet && !text) {
      return { result: { messageId, status: "skipped_empty" } };
    }

    if (!classification) {
      classification = await this.geminiApi.classifyEmail({
        subject,
        snippet,
        text: text.slice(0, CLASSIFY_TEXT_LIMIT),
      });
      if (
        typeof classification?.is_job_related !== "boolean" ||
        typeof classification.confidence !== "number" ||
        classification.confidence < 0 ||
        classification.confidence > 1
      ) {
        throw new Error("Gemini returned an invalid email classification");
      }
      const jobRelated = isJobRelated(classification);
      await this.cacheClassification(
        messageId,
        classification,
        jobRelated ? undefined : "skipped_classification",
      );
      if (!jobRelated) {
        return {
          result: { messageId, status: "skipped_classification", classification },
        };
      }
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

    return { pending: { messageId, classification, extraction, date, threadId } };
  }

  // Matches and writes the application. Run this one email at a time, so two
  // emails from one company cannot create two applications.
  async applyMessage(
    { messageId, classification, extraction, date, threadId },
    { updateOnly = false } = {},
  ) {
    const match = await this.matchApplication(extraction, threadId);
    const writeResult = await this.guardedUpsert({
      extraction,
      date,
      emailId: messageId,
      threadId,
      match,
      updateOnly,
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

  async parseMessage(messageId, options = {}) {
    const analyzed = await this.analyzeMessage(messageId, options);
    return analyzed.result || this.applyMessage(analyzed.pending, options);
  }

  // One bad email is reported as an "error" result. An expired Gmail token stops
  // the scan, because every other email would fail the same way.
  failedMessage(messageId, error) {
    if (error.code === "GMAIL_API_ERROR" && error.status === 401) throw error;
    logger.error({
      event: "email_scan_message_failed",
      messageId,
      message: error.message,
    });
    return { messageId, status: "error", error: error.message };
  }

  async runPipeline({
    lastHistoryId = null,
    pubSubPayload = null,
    updateOnly = false,
  } = {}) {
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
      const messages = await this.gmailApi.fetchListEmails(SCAN_QUERY);
      messageIds = messages.map((m) => m.id);
      nextHistoryId = notificationHistoryId || nextHistoryId;
    }

    const analyzed = await mapWithConcurrency(
      messageIds,
      SCAN_CONCURRENCY,
      async (messageId) => {
        try {
          return await this.analyzeMessage(messageId, { updateOnly });
        } catch (error) {
          return { result: this.failedMessage(messageId, error) };
        }
      },
    );

    // Gmail lists the newest email first. Keep that order when writing.
    const processed = [];
    for (const [index, item] of analyzed.entries()) {
      if (item.result) {
        processed.push(item.result);
        continue;
      }
      try {
        processed.push(await this.applyMessage(item.pending, { updateOnly }));
      } catch (error) {
        processed.push(this.failedMessage(messageIds[index], error));
      }
    }

    return {
      processed,
      lastHistoryId: nextHistoryId,
      reviewQueue: this.reviewQueue,
    };
  }
}
