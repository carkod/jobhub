import { GoogleGenAI } from "@google/genai";
import { logger } from "../requestLogger.js";

export const CLASSIFICATION_SCHEMA = {
  type: "object",
  required: ["is_job_related", "confidence", "reason"],
  properties: {
    is_job_related: { type: "boolean" },
    confidence: { type: "number" },
    reason: { type: "string" },
  },
};

export const EXTRACTION_SCHEMA = {
  type: "object",
  required: ["company", "confidence"],
  properties: {
    status: { type: "string" },
    job_title: { type: "string" },
    company: { type: "string" },
    location: { type: "string" },
    application_link: { type: "string" },
    job_requirements: { type: "string" },
    confidence: { type: "number" },
    thread_id: { type: "string" },
  },
};

export default class GeminiApi {
  static max_output_tokens = 512;

  setupClient() {
    const project = process.env.GOOGLE_CLOUD_PROJECT || process.env.PROJECT_ID;
    if (!project) {
      throw new Error("GOOGLE_CLOUD_PROJECT or PROJECT_ID must be configured for Gemini");
    }

    return new GoogleGenAI({
      enterprise: true,
      project,
      location: process.env.GOOGLE_CLOUD_LOCATION || "global",
      apiVersion: "v1",
    });
  }

  getModelName() {
    return process.env.GEMINI_MODEL || "gemini-3.8-flash";
  }

  async generateContent(contents, config = {}) {
    const client = this.setupClient();
    return client.models.generateContent({
      model: this.getModelName(),
      contents,
      config: {
        maxOutputTokens: this.constructor.max_output_tokens,
        ...config,
      },
    });
  }

  async requestJson(prompt, schema) {
    const result = await this.generateContent(
      [{ role: "user", parts: [{ text: prompt }] }],
      {
        responseMimeType: "application/json",
        responseJsonSchema: schema,
      },
    );

    const text = result?.text || "{}";
    logger.debug({ event: "gemini_raw_output", output: text });
    return JSON.parse(text);
  }

  async classifyEmail({ subject, snippet, text }) {
    const prompt = `Classify whether this email is related to a job application pipeline. Return strict JSON.\nSubject: ${subject || ""}\nSnippet: ${snippet || ""}\nBody: ${text || ""}`;
    return this.requestJson(prompt, CLASSIFICATION_SCHEMA);
  }

  async extractJobData({ subject, snippet, text }) {
    const prompt = `Extract job-application details from this email. Return strict JSON.\nSubject: ${subject || ""}\nSnippet: ${snippet || ""}\nBody: ${text || ""}`;
    return this.requestJson(prompt, EXTRACTION_SCHEMA);
  }
}
