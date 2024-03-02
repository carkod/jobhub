import { VertexAI } from "@google-cloud/vertexai";

const tools = [
  {
    function_declarations: [
      {
        name: "extract_job_details",
        description: `Extract job details from the email and set status of the job application according to the email`,
        parameters: {
          type: "object",
          required: ["company"],
          properties: {
            status: {
              type: "string",
              enum: [
                "Applied",
                "In progress",
                "Rejected",
                "Not an application",
              ],
              description: `Categorize email as "Applied" by default, "Rejected" it the candidate has been rejected, "In progress" if there is an interview scheduled or an assignment to be completed`,
            },
            job_title: {
              type: "string",
              description: `The job title.`,
            },
            company: {
              type: "string",
              description: `The company name.`,
            },
            location: {
              type: "string",
              description: `The city where the job is located.`,
            },
            application_link: {
              type: "string",
              description: `The application link.`,
            },
          },
        },
      },
    ],
  },
];

/**
 * Class to interact with the Gemini API
 * 
 * Docs: https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini
 * GCloud Project Console: https://console.cloud.google.com/apis/credentials?project=jobhub-415000
 */
export default class GeminiApi {

  static max_output_tokens = 256;
  static regions = ["us-central1", "europe-west1", "europe-west2", "europe-west3", "europe-west4", "europe-west9", "northamerica-northeast1", "asia-northeast1", "asia-northeast3", "asia-southeast1"]

  constructor() {
    this.requests_per_minute = 300;
    this.currentRegionIndex = 0;
  }

  /**
   * Rotate regions so that we don't hit the rate limit
   * most of servers have max request per minute of only 60
   * 
   * https://cloud.google.com/vertex-ai/generative-ai/docs/quotas
   */
  setRegionIndex() {
    if (this.currentRegionIndex < this.constructor.regions.length - 1) {
      this.currentRegionIndex = this.currentRegionIndex + 1;
    } else {
      this.currentRegionIndex = 0;
    }
  }

  setupAi() {
    this.setRegionIndex();
    const vertexAi = new VertexAI({
      project: process.env.PROJECT_ID,
      location: this.constructor.regions[this.currentRegionIndex],
    });
    const model = vertexAi.getGenerativeModel({
      model: "gemini-pro",
      generation_config: {
        max_output_tokens: this.constructor.max_output_tokens,
      },
    });

    const chat = model.startChat({
      tools: tools,
    });
    return chat;
  }

  async sendMessage(input) {
    const chat = this.setupAi();
    return await chat.sendMessageStream(input);
  }

  async classifyEmails(part) {

    let data = null;
    const chatInput1 = `Is this email is related to a job application? If it is, extract job details: ${part.text}`;
    const result = await this.sendMessage(chatInput1);
    // sometimes response takes time to process
    for await (const chunk of result.stream) {
      if (chunk.candidates[0].content.parts) {
        const { functionCall } = chunk.candidates[0].content.parts[0];
        console.log(functionCall)
        if (functionCall && functionCall.args && functionCall.args.status && functionCall.args.status.toLowerCase() !== "not an application" && functionCall.args.company && functionCall.args.company !== "None") {
          data = functionCall.args;
          break;
        }
      }
    }
    return data;
  }
}
