import mongoose from "mongoose";
import { ApplicationSchema } from "../Schemas.js";
import { cleanQueryString, escapeRegex } from "../utils.js";
import GeminiApi from "./GeminiApi.js";
import GmailApi from "./GmailApi.js";

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
    this.reviewQueue = [];
  }

  computePrefilterScore({ subject = "", snippet = "", body = "" }) {
    const text = `${subject} ${snippet} ${body}`.toLowerCase();
    const positiveSignals = [
      "application",
      "interview",
      "recruiter",
      "candidate",
      "hiring",
      "position",
      "job",
    ];
    const negativeSignals = [
      "discount",
      "sale",
      "offer",
      "coupon",
      "marketing",
      "unsubscribe",
      "shop",
    ];

    const positive = positiveSignals.reduce(
      (acc, s) => (text.includes(s) ? acc + 1 : acc),
      0,
    );
    const negative = negativeSignals.reduce(
      (acc, s) => (text.includes(s) ? acc + 1 : acc),
      0,
    );

    return { score: positive - negative, positive, negative };
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

    const payload = {
      role: extraction.job_title,
      company: extraction.company,
      location: extraction.location,
      applicationUrl: extraction.application_link,
      updatedAt: new Date(date || Date.now()),
      status: { text: extraction.status || "Applied" },
      description: extraction.job_requirements,
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
      createdAt: new Date(date || Date.now()),
    });
    return { status: "created" };
  }

  async parseMessage(messageId) {
    const email = await this.gmailApi.fetchIndividualEmail(messageId);
    const headers = email?.payload?.headers || [];
    const subject =
      headers.find((h) => h.name.toLowerCase() === "subject")?.value || "";
    const date = headers.find((h) => h.name.toLowerCase() === "date")?.value;
    const threadId = email.threadId;
    const snippet = email.snippet || "";
    const part = email?.payload?.parts?.[0]?.body?.data;
    const text = part ? Buffer.from(part, "base64").toString("utf-8") : "";

    const prefilter = this.computePrefilterScore({
      subject,
      snippet,
      body: text,
    });
    if (prefilter.score <= 0) {
      return { messageId, status: "skipped_prefilter", prefilter };
    }

    const classification = await this.geminiApi.classifyEmail({
      subject,
      snippet,
      text,
    });
    if (!classification?.is_job_related || classification.confidence < 0.8) {
      return { messageId, status: "skipped_classification", classification };
    }

    const extraction = await this.geminiApi.extractJobData({
      subject,
      snippet,
      text,
    });
    const match = await this.matchApplication(extraction, threadId);
    const writeResult = await this.guardedUpsert({
      extraction,
      date,
      emailId: messageId,
      threadId,
      match,
    });

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
