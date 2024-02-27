import { VertexAI } from "@google-cloud/vertexai";
import { delay } from "../utils";

const tools = [
  {
    function_declarations: [
      {
        name: "classify_email",
        parameters: {
          type: "object",
          description:
            "Classify email as a job application or not. Reply with `true` or `false`",
          properties: {
            categorize_email: {
              type: "boolean",
              description:
                "Return true if the email is related to a job application or false if it is not.",
            },
          },
        },
      },
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

  constructor() {
    try {
      this.vertexAi = new VertexAI({
        project: "jobhub-415000",
        location: "us-east4",
      });
      this.model = this.vertexAi.getGenerativeModel({
        model: "gemini-pro",
        generation_config: {
          max_output_tokens: this.constructor.max_output_tokens,
        },
      });
    } catch (error) {
      console.error("Error initializing Gemini API", error);
    }
    this.chat = null;
  }


  async classifyEmails(part) {

    this.chat = this.model.startChat({
      tools: tools,
    });

    const chatInput1 = `Is this email is related to a job application ${part.text}`;
    const result = await this.chat.sendMessageStream(chatInput1);
    for await (const chunk of result.stream) {
      if (chunk.candidates[0].content.parts) {
        const { functionCall } = chunk.candidates[0].content.parts[0];
        if (functionCall && functionCall.args && functionCall.args.categorize_email) {
          const chatInput2 = `Get status of this email and extract job details: ${part.text}`;
          await delay(5000);
          const result2 = await this.chat.sendMessageStream(chatInput2);
          for await (const chunk2 of result2.stream) {
            if (chunk2.candidates[0].content.parts) {
              const functionCall2 = chunk2.candidates[0].content.parts[0].functionCall;
              if (functionCall2 && functionCall2.args && functionCall2.args.status && functionCall2.args.status.toLowerCase() !== "not an application" && functionCall2.args.company) {
                return functionCall2.args
              }
            }
          }
        }
      }
    }
  }
}
