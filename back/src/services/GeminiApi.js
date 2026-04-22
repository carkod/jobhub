import { VertexAI } from "@google-cloud/vertexai";

const CLASSIFICATION_SCHEMA = {
  type: "OBJECT",
  properties: {
    is_job_related: { type: "BOOLEAN" },
    email_type: {
      type: "STRING",
      enum: [
        "application",
        "interview",
        "assessment",
        "offer",
        "rejection",
        "outreach",
        "unrelated",
      ],
    },
    confidence: { type: "NUMBER" },
  },
  required: ["is_job_related", "email_type", "confidence"],
};

const EXTRACTION_SCHEMA = {
  type: "OBJECT",
  properties: {
    company: { type: "STRING", nullable: true },
    job_title: { type: "STRING", nullable: true },
    status: {
      type: "STRING",
      enum: [
        "Applied",
        "In progress",
        "Interview",
        "Assessment",
        "Offer",
        "Rejected",
        "Unknown",
      ],
    },
    location: { type: "STRING", nullable: true },
    city: { type: "STRING", nullable: true },
    work_mode: {
      type: "STRING",
      enum: ["Remote", "Hybrid", "On-site", "Unknown"],
    },
    contract_type: { type: "STRING", nullable: true },
    salary: { type: "STRING", nullable: true },
    application_link: { type: "STRING", nullable: true },
    recruiter_name: { type: "STRING", nullable: true },
    event_date: { type: "STRING", nullable: true },
    confidence: { type: "NUMBER" },
  },
  required: ["status", "work_mode", "confidence"],
};

/**
 * Class to interact with the Gemini API
 */
export default class GeminiApi {
  static maxOutputTokens = 512;
  static model = "gemini-2.5-flash";
  static regions = [
    "us-central1",
    "europe-west1",
    "europe-west2",
    "europe-west3",
    "europe-west4",
    "europe-west9",
    "northamerica-northeast1",
    "asia-northeast1",
    "asia-northeast3",
    "asia-southeast1",
  ];

  constructor(logger = console) {
    this.currentRegionIndex = 0;
    this.logger = logger;
  }

  setRegionIndex() {
    if (this.currentRegionIndex < this.constructor.regions.length - 1) {
      this.currentRegionIndex += 1;
    } else {
      this.currentRegionIndex = 0;
    }
  }

  setupModel(responseSchema) {
    this.setRegionIndex();
    const vertexAi = new VertexAI({
      project: process.env.PROJECT_ID,
      location: this.constructor.regions[this.currentRegionIndex],
    });

    return vertexAi.getGenerativeModel({
      model: this.constructor.model,
      generationConfig: {
        maxOutputTokens: this.constructor.maxOutputTokens,
        responseMimeType: "application/json",
        responseSchema,
      },
    });
  }

  async requestJson({ prompt, responseSchema, taskName }) {
    const model = this.setupModel(responseSchema);
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    this.logger.info?.(`[GeminiApi:${taskName}] raw=${text}`);

    try {
      return JSON.parse(text);
    } catch (error) {
      this.logger.error?.(`[GeminiApi:${taskName}] JSON parse failed`, error);
      return null;
    }
  }

  buildEmailPrompt(email) {
    return [
      `From: ${email.from || ""}`,
      `Domain: ${email.senderDomain || ""}`,
      `Subject: ${email.subject || ""}`,
      `Snippet: ${email.snippet || ""}`,
      `Body: ${email.body || ""}`,
    ].join("\n");
  }

  async classifyEmail(email) {
    const input = this.buildEmailPrompt(email);
    const prompt = `${input}\n\nClassify this email.\n\nReturn TRUE only if the email is clearly related to:\n- job application\n- interview\n- recruiter outreach about a role\n- assessment / coding test\n- job offer or rejection\n\nReturn FALSE for:\n- shopping / orders / delivery / receipts\n- marketing emails\n- newsletters\n- unrelated company emails\n\nPrefer false negatives over false positives.`;

    return this.requestJson({
      prompt,
      responseSchema: CLASSIFICATION_SCHEMA,
      taskName: "classification",
    });
  }

  async extractJobData(email) {
    const input = this.buildEmailPrompt(email);
    const prompt = `${input}\n\nExtract structured fields for a job-related email.\nRules:\n- DO NOT invent values\n- return null if missing\n- extract only explicit info\n- prefer precision over completeness`;

    return this.requestJson({
      prompt,
      responseSchema: EXTRACTION_SCHEMA,
      taskName: "extraction",
    });
  }
}
