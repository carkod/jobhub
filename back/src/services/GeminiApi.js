import { VertexAI } from "@google-cloud/vertexai";

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
  static regions = ["us-central1", "europe-west1", "europe-west2", "asia-northeast1"];

  constructor() {
    this.currentRegionIndex = 0;
  }

  setRegionIndex() {
    this.currentRegionIndex = (this.currentRegionIndex + 1) % this.constructor.regions.length;
  }

  setupModel() {
    this.setRegionIndex();
    const vertexAi = new VertexAI({
      project: process.env.PROJECT_ID,
      location: this.constructor.regions[this.currentRegionIndex],
    });

    return vertexAi.getGenerativeModel({
      model: "gemini-2.0-flash-001",
      generation_config: {
        max_output_tokens: this.constructor.max_output_tokens,
        temperature: 0,
      },
    });
  }

  async requestJson(prompt, schema) {
    const model = this.setupModel();
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    console.log("gemini_raw_output", text);
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
