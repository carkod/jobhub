import mongoose from "mongoose";
import { ApplicationSchema } from "../Schemas.js";
import { escapeRegex } from "../utils.js";
import GeminiApi from "./GeminiApi.js";
import GmailApi from "./GmailApi.js";

const POSITIVE_KEYWORDS = ["application", "interview", "assessment", "role", "position"];
const POSITIVE_PHRASES = ["thank you for applying", "next steps", "we reviewed"];
const ATS_DOMAINS = ["greenhouse", "lever", "workday", "ashby"];
const CAREER_DOMAIN_HINTS = ["careers", "jobs"];
const NEGATIVE_KEYWORDS = ["order", "delivery", "receipt", "invoice", "refund"];
const NEGATIVE_PHRASES = ["basket", "clubcard", "points", "discount"];
const RETAIL_DOMAIN_HINTS = ["shop", "store", "retail", "marketplace"];

const STATUS_MAP = {
  Applied: "applied",
  "In progress": "in progress",
  Interview: "in progress",
  Assessment: "in progress",
  Offer: "success",
  Rejected: "rejected",
  Unknown: "applied",
};

export default class EmailParser {
  constructor(access_token, limit = 300, logger = console) {
    this.access_token = access_token;
    this.limit = limit;
    this.logger = logger;
    this.gmailApi = new GmailApi(access_token, limit);
    this.geminiApi = new GeminiApi(logger);
    this.ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);
    this.reviewQueue = [];
  }

  async getApplicationByThreadId(threadId) {
    if (!threadId) return null;
    return this.ApplicationModel.findOne({ threadId });
  }

  async getApplicationByCompany(company) {
    if (!company) return null;
    const regex = escapeRegex(company);
    return this.ApplicationModel.findOne({ company: { $regex: regex, $options: "i" } });
  }

  async getApplicationByExactTitle(role) {
    if (!role) return null;
    const regex = `^${escapeRegex(role)}$`;
    return this.ApplicationModel.findOne({ role: { $regex: regex, $options: "i" } });
  }

  parseFromHeader(headers = []) {
    const byName = (name) => headers.find((h) => h.name?.toLowerCase() === name)?.value || "";
    const from = byName("from");
    const subject = byName("subject");
    const date = byName("date");

    const senderEmail = from.match(/<([^>]+)>/)?.[1] || from;
    const senderDomain = senderEmail.includes("@") ? senderEmail.split("@").pop().toLowerCase() : "";

    return { from, subject, date, senderDomain };
  }

  decodeBase64Url(data = "") {
    if (!data) return "";
    const normalized = data.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(normalized, "base64").toString("utf-8");
  }

  flattenBody(payload) {
    if (!payload) return "";

    const chunks = [];
    const walk = (part) => {
      if (part?.body?.data) {
        chunks.push(this.decodeBase64Url(part.body.data));
      }
      if (part?.parts?.length) {
        for (const child of part.parts) {
          walk(child);
        }
      }
    };

    walk(payload);
    return chunks.join(" ").replace(/\s+/g, " ").trim();
  }

  buildEmailInput(emailContent) {
    const { snippet, payload = {}, id, threadId } = emailContent;
    const parsedHeaders = this.parseFromHeader(payload.headers || []);
    const body = this.flattenBody(payload);

    return {
      id,
      threadId,
      snippet: snippet || "",
      body,
      ...parsedHeaders,
    };
  }

  calculatePrefilterScore(email) {
    const corpus = `${email.subject || ""} ${email.body || ""}`.toLowerCase();
    let jobScore = 0;
    let commerceScore = 0;

    for (const keyword of POSITIVE_KEYWORDS) {
      if (corpus.includes(keyword)) {
        jobScore += 2;
      }
    }

    for (const phrase of POSITIVE_PHRASES) {
      if ((email.body || "").toLowerCase().includes(phrase)) {
        jobScore += 3;
      }
    }

    for (const domainHint of ATS_DOMAINS) {
      if ((email.senderDomain || "").includes(domainHint)) {
        jobScore += 4;
      }
    }

    for (const domainHint of CAREER_DOMAIN_HINTS) {
      if ((email.senderDomain || "").includes(domainHint)) {
        jobScore += 2;
      }
    }

    for (const keyword of NEGATIVE_KEYWORDS) {
      if (corpus.includes(keyword)) {
        commerceScore += 4;
      }
    }

    for (const phrase of NEGATIVE_PHRASES) {
      if ((email.body || "").toLowerCase().includes(phrase)) {
        commerceScore += 3;
      }
    }

    for (const domainHint of RETAIL_DOMAIN_HINTS) {
      if ((email.senderDomain || "").includes(domainHint)) {
        commerceScore += 2;
      }
    }

    return { jobScore, commerceScore };
  }

  shouldPassPrefilter(email) {
    const { jobScore, commerceScore } = this.calculatePrefilterScore(email);
    const pass = !(commerceScore >= 4 && jobScore === 0);
    return { pass, jobScore, commerceScore };
  }

  textSimilarity(a = "", b = "") {
    const tokensA = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
    const tokensB = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));

    if (tokensA.size === 0 || tokensB.size === 0) return 0;

    const intersection = Array.from(tokensA).filter((token) => tokensB.has(token)).length;
    const union = new Set([...tokensA, ...tokensB]).size;
    return intersection / union;
  }

  async matchApplication(emailInput, extraction) {
    if (emailInput.threadId) {
      const byThread = await this.getApplicationByThreadId(emailInput.threadId);
      if (byThread) {
        return { applicationId: byThread._id, confidence: 1 };
      }
    }

    if (extraction.company) {
      const byCompany = await this.getApplicationByCompany(extraction.company);
      if (byCompany) {
        return { applicationId: byCompany._id, confidence: 0.94 };
      }
    }

    if (extraction.job_title) {
      const byTitle = await this.getApplicationByExactTitle(extraction.job_title);
      if (byTitle) {
        return { applicationId: byTitle._id, confidence: 0.9 };
      }

      const applications = await this.ApplicationModel.find({ role: { $exists: true, $ne: null } }).limit(200);
      let best = { applicationId: null, confidence: 0 };

      for (const application of applications) {
        const similarity = this.textSimilarity(extraction.job_title, application.role);
        if (similarity > best.confidence) {
          best = { applicationId: application._id, confidence: similarity * 0.89 };
        }
      }

      if (best.applicationId) {
        return best;
      }
    }

    return { applicationId: null, confidence: 0 };
  }

  mapStatus(status) {
    return STATUS_MAP[status] || "applied";
  }

  async guardedUpdate({ extraction, match, emailInput, emailDate }) {
    if (extraction.confidence >= 0.85 && match.confidence >= 0.9) {
      const updatePayload = {
        role: extraction.job_title || undefined,
        company: extraction.company || "Unknown",
        location: extraction.location || extraction.city || undefined,
        applicationUrl: extraction.application_link || undefined,
        salary: extraction.salary || undefined,
        recruiterName: extraction.recruiter_name || undefined,
        contractType: extraction.contract_type || undefined,
        workMode: extraction.work_mode,
        eventDate: extraction.event_date || undefined,
        threadId: emailInput.threadId,
        emailId: emailInput.id,
        updatedAt: emailDate,
        status: { text: this.mapStatus(extraction.status) },
      };

      if (match.applicationId) {
        await this.ApplicationModel.updateOne({ _id: match.applicationId }, updatePayload);
        return { updated: true, review: false };
      }

      if (!extraction.company) {
        this.reviewQueue.push({ reason: "missing_company", extraction, emailInput, match });
        return { updated: false, review: true };
      }

      await new this.ApplicationModel({
        _id: mongoose.Types.ObjectId(),
        createdAt: emailDate,
        ...updatePayload,
      }).save();

      return { updated: true, review: false };
    }

    this.reviewQueue.push({ reason: "low_confidence", extraction, emailInput, match });
    return { updated: false, review: true };
  }

  async processMessage(messageId) {
    const emailContent = await this.gmailApi.fetchIndividualEmail(messageId);
    const emailInput = this.buildEmailInput(emailContent);

    const prefilter = this.shouldPassPrefilter(emailInput);
    if (!prefilter.pass) {
      this.logger.info?.(`[EmailParser] Rejected by prefilter id=${messageId}`);
      return { messageId, outcome: "prefilter_reject", prefilter };
    }

    const classification = await this.geminiApi.classifyEmail(emailInput);
    this.logger.info?.(`[EmailParser] classification=${JSON.stringify(classification)}`);

    if (!classification?.is_job_related || classification?.confidence < 0.8) {
      return { messageId, outcome: "classification_reject", classification };
    }

    const extraction = await this.geminiApi.extractJobData(emailInput);
    this.logger.info?.(`[EmailParser] extraction=${JSON.stringify(extraction)}`);

    if (!extraction) {
      this.reviewQueue.push({ reason: "invalid_extraction", emailInput });
      return { messageId, outcome: "review_invalid_extraction" };
    }

    const match = await this.matchApplication(emailInput, extraction);
    const emailDate = emailInput.date ? new Date(emailInput.date) : new Date();
    const updateResult = await this.guardedUpdate({ extraction, match, emailInput, emailDate });

    return {
      messageId,
      outcome: updateResult.updated ? "updated" : "queued_review",
      classification,
      extraction,
      match,
    };
  }

  async processHistoryChanges(lastHistoryId) {
    const { history, historyId: newestHistoryId } = await this.gmailApi.fetchHistory(lastHistoryId);
    const messageIds = this.gmailApi.extractMessageIdsFromHistory(history);

    const results = [];
    for (const messageId of messageIds) {
      results.push(await this.processMessage(messageId));
    }

    return {
      processed: results,
      reviewQueue: this.reviewQueue,
      lastHistoryId: newestHistoryId || lastHistoryId,
    };
  }

  async genericApplicationParser({ lastHistoryId = null } = {}) {
    if (lastHistoryId) {
      return this.processHistoryChanges(lastHistoryId);
    }

    const messages = await this.gmailApi.fetchListEmails();
    const results = [];

    for (const message of messages) {
      results.push(await this.processMessage(message.id));
    }

    return {
      processed: results,
      reviewQueue: this.reviewQueue,
      lastHistoryId: null,
    };
  }
}
