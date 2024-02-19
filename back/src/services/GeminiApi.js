import { GoogleGenerativeAI } from "@google/generative-ai";
import { VertexAI } from "@google-cloud/vertexai";
import { GoogleAuth } from "google-auth-library";
import { Storage } from "@google-cloud/storage";

const tools = [
  {
    function_declarations: [
      {
        name: "classify_email",
        parameters: {
          type: "object",
          description:
            "Classify each email as a job application or not. Reply with `true` or `false`",
          properties: {
            categorize_email: {
              type: "boolean",
              description: `Answer the question with true or false`,
            },
          },
        },
      },
      {
        name: "status",
        description: `Classify the email in one of the following categories: "Applied", "In progress", "Rejected", "Not an application".`,
        parameters: {
          type: "object",
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
          },
        },
      },
      {
        name: "extract_job_details",
        description: `Extract job details from the email.`,
        parameters: {
          type: "object",
          required: ["company"],
          properties: {
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
export default class GeminiApi {
  constructor() {
    try {
      this.vertexAi = new VertexAI({
        preview: true,
        project: "jobhub-415000",
        location: "us-east4",
      });
      // this.genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (error) {
      console.error("Error initializing Gemini API", error);
    }

    this.chatMessages = [];
    this.assistant = null;
    this.thread = null;
    this.run = null;
  }

  async classifyEmails(parts) {
    // For text-only input, use the gemini-pro model
    // this.model = this.vertexAi.getGenerativeModel({ model: "gemini-pro"});
    this.model = this.vertexAi.getGenerativeModel({
      model: "text-bison",
    });

    const chat = this.model.startChat({
      tools: tools,
    });

    // [parts[0].text]
    // const request = {
    //   contents: [{role: 'user', parts: [parts[0]]}],
    //   tools: tools,
    // };

    let data = [];

    for (const part of parts) {
      const chatInput1 = `Is this email a job application? ${part.text}`;

      // const result = await this.model.generateContentStream(request);
      try {
        
        const result = await chat.sendMessageStream(chatInput1);
      } catch (error) {
        console.error("Error classifying emails", error);
      }
      const result = await chat.sendMessageStream(chatInput1);

      for await (const chunk of result.stream) {
        if (chunk.candidates[0].content.parts === undefined) {
          console.log(chunk.candidates[0].content);
        }
        const functionCall = chunk.candidates[0].content.parts[0];
        if (
          functionCall &&
          functionCall.args &&
          functionCall.args.status !== "Not an application"
        ) {
          const jobApplicationCheck = functionCall.args.categorize_email;
          if (jobApplicationCheck) {
            console.log(jobApplicationCheck);
          }
        }
      }
    }
    return data
  }
}
