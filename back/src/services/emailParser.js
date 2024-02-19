import mongoose from "mongoose";
import { ApplicationSchema } from "../Schemas.js";
import GmailApi from "./GmailApi.js";
import { escapeRegex } from "../utils.js";
import GeminiApi from "./GeminiApi.js";
export default class EmailParser {
  // This keyword should filter most job application emails
  static keywords = ["Your application"];
  static senders = [
    "linkedin <jobs-noreply@linkedin.com>",
    "workable <noreply@candidates.workablemail.com>",
  ];

  constructor(access_token, limit = 100) {
    this.access_token = access_token;
    this.limit = limit;
    this.gmailApi = new GmailApi(access_token, limit);
    this.geminiApi = new GeminiApi();
    this.ApplicationModel = mongoose.model(
      "ApplicationModel",
      ApplicationSchema
    );
    this.miscellaneousRecruitersList = [];
    this.contentParts = [];
  }

  getApplicationByCompany(company) {
    const regex = escapeRegex(company);
    return this.ApplicationModel.findOne({
      company: { $regex: regex, $options: "i" },
    });
  }

  updateApplicationByCompany(application) {
    return this.ApplicationModel.updateOne(
      {
        company: application.company,
      },
      application
    );
  }

  parseCompanyName(companyName) {
    const words = companyName.split(" ");
    const set = new Set(words);
    // Remove special character
    const trimmedCompanyName = Array.from(set)
      .join(" ")
      .split(" ")
      .filter((x) => x !== "͏");
    return trimmedCompanyName.join(" ");
  }

  async linkedinRejectionEmails(parts, snippet, date) {
    const part1 = Buffer.from(parts[0].body.data, "base64").toString("utf-8");
    if (part1.includes("email_jobs_application_rejected")) {
      const match = /Your application to\s+(.*?)\s+at\s+(.*)/.exec(snippet);
      if (match && match.length === 3) {
        const companyName = this.parseCompanyName(match[2]);
        const applicationByCompany = await this.getApplicationByCompany(
          companyName
        );
        if (
          applicationByCompany &&
          applicationByCompany.status.value === 0 &&
          applicationByCompany.role.toLowerCase() === match[1].toLowerCase()
        ) {
          let status = {
            value: 2,
            text: "Rejected",
          };
          let lastStage = {
            order: 1,
            completed: true,
            action: "Application rejected",
            dept: "HR",
            startDate: new Date(date),
          };
          applicationByCompany.status = status;
          applicationByCompany.stages.push(lastStage);
          applicationByCompany.save();
        }
      }
    }
  }

  async linkedInEmails(parts, snippet, date, subject) {
    if (subject.toLowerCase() === this.constructor.senders[0]) {
      if (parts) {
        const match = /Your application was sent to (.*?)‌/.exec(snippet);

        if (match.length === 2) {
          const jobDetails = Buffer.from(parts[0].body.data, "base64").toString(
            "utf-8"
          );
          const matchDetails = /-{64,}\r\n([\s\S]+?)-{64,}/.exec(jobDetails);
          const extractedText = matchDetails[1].split("\r\n");
          // Ensure format is correct and company matches
          if (extractedText[1] === match[1]) {
            let status = {
              value: 0,
              text: "Applied",
            };
            let firstStage = {
              order: 1,
              completed: false,
              action: "Online application",
              dept: "HR",
              startDate: new Date(date),
            };

            const applicationUrl = /(https:\/\/\S*)/.exec(extractedText[4]);
            const findCompany = await this.ApplicationModel.findOne({
              company: extractedText[1],
            });
            if (!findCompany) {
              let application = new this.ApplicationModel({
                _id: mongoose.Types.ObjectId(),
                role: extractedText[0],
                company: extractedText[1],
                location: extractedText[2],
                applicationUrl: applicationUrl[1],
                date: date,
                status: status,
                stages: [firstStage],
              });
              application.save();
            }
          }
        }
      }
    }
  }

  /**
   * Email parser for LinkedIn job applications
   *
   * to be replaced by classification algorithsm in the future
   * @param {*} access_token
   * @param {number} limit
   * @returns
   */
  async linkedInEmails(parts, snippet, date, subject) {
    if (subject.toLowerCase() === this.constructor.senders[1]) {
      if (parts) {
        const match = /Your application was sent to (.*?)‌/.exec(snippet);

        if (match.length === 2) {
          const jobDetails = Buffer.from(parts[0].body.data, "base64").toString(
            "utf-8"
          );
          const matchDetails = /-{64,}\r\n([\s\S]+?)-{64,}/.exec(jobDetails);
          const extractedText = matchDetails[1].split("\r\n");
          // Ensure format is correct and company matches
          if (extractedText[1] === match[1]) {
            let status = {
              value: 0,
              text: "Applied",
            };
            let firstStage = {
              order: 1,
              completed: false,
              action: "Online application",
              dept: "HR",
              startDate: new Date(date),
            };

            const applicationUrl = /(https:\/\/\S*)/.exec(extractedText[4]);
            const findCompany = await this.ApplicationModel.findOne({
              company: extractedText[1],
            });
            if (!findCompany) {
              let application = new this.ApplicationModel({
                _id: mongoose.Types.ObjectId(),
                role: extractedText[0],
                company: extractedText[1],
                location: extractedText[2],
                applicationUrl: applicationUrl[1],
                date: date,
                status: status,
                stages: [firstStage],
              });
              application.save();
            }
          }
        }
      }
    }
  }


  async workable(parts, snippet, date, subject) {
    const searchKeywords = ["Your application for the"];
    const part1 = Buffer.from(parts[0].body.data, "base64").toString("utf-8");
    const part2 = Buffer.from(parts[1].body.data, "base64").toString("utf-8");
    const phrase = searchKeywords[0];
    if (part1.includes(phrase)) {
      const escapedPattern = searchKeywords[0].replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const regexString = `^([^0-9]+) ${escapedPattern} (.+?) job`;
      const regexPattern = new RegExp(regexString, "i");
      const match = snippet.match(regexPattern);
      if (match && match.length >= 2) {
        const companyName = match[1];
        if (companyName) {
          const applicationByCompany = await this.getApplicationByCompany(
            companyName
          );
          if (!applicationByCompany) {
            // Get application URL
            const escapedPattern = "Withdraw this application".replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            );
            const regexPattern = new RegExp(`${escapedPattern}\\s*([^\r\n]+)`);
            const extractedText = part1.match(regexPattern);

            let status = {
              value: 0,
              text: "Applied",
            };
            let firstStage = {
              order: 1,
              completed: false,
              action: "Online application",
              dept: "HR",
              startDate: new Date(date),
            };
            let application = new this.ApplicationModel({
              _id: mongoose.Types.ObjectId(),
              role: match[2],
              company: companyName,
              applicationUrl: extractedText[1],
              date: date,
              status: status,
              stages: [firstStage],
            });
            application.save();
          }
        }
      }
    }
  }

  async genericApplicationParser() {
    const messages = await this.gmailApi.fetchListEmails(
      this.constructor.keywords[0]
    );

    if (messages.length === 0) {
      throw new Error("No messages found.");
    } else {
      for (const message of messages) {
        const {
          snippet,
          payload: { parts, headers },
        } = await this.gmailApi.fetchIndividualEmail(message.id);

        const subject = headers.find(
          (header) => header.name.toLowerCase() === "from"
        ).value;
        const date = headers.find(
          (date) => date.name.toLowerCase() === "date"
        ).value;

        if (parts && parts[0].body.size > 0) {
          const part1 = Buffer.from(parts[0].body.data, "base64").toString(
            "utf-8"
          );
          let processedContent = part1.replace(/\\r\\n/, " ")
          processedContent = processedContent.replace(/'/g, "\\'");
          this.miscellaneousRecruitersList.push({
            snippet: snippet,
            date: date,
            subject: subject,
            content: part1,
          });
          this.contentParts.push({
            text: processedContent
          });
        }
      }
      const text = await this.geminiApi.classifyEmails(this.contentParts);
    }
  }
}
