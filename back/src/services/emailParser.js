import mongoose from "mongoose";
import { ApplicationSchema } from "../Schemas.js";
import { escapeRegex } from "../utils.js";
import GeminiApi from "./GeminiApi.js";
import GmailApi from "./GmailApi.js";

export default class EmailParser {
  // This keyword should filter most job application emails
  static keywords = ["Your application"];

  constructor(access_token, limit = 300) {
    this.access_token = access_token;
    this.limit = limit;
    this.gmailApi = new GmailApi(access_token, limit);
    this.geminiApi = new GeminiApi();
    this.ApplicationModel = mongoose.model(
      "ApplicationModel",
      ApplicationSchema
    );
    this.contentParts = [];
    this.jobApplicationEmails = [];
  }

  getApplicationByCompany(company) {
    let regex = escapeRegex(company);
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

  async saveApplication(emailData, date, emailId) {
    const applicationDate = new Date(date);
    const application = {
      role: emailData?.job_title,
      company: emailData.company,
      location: emailData?.location,
      applicationUrl: emailData.application_link,
      updatedAt: new Date(date),
      status: {
        text: emailData.status,
      },
      description: emailData.job_requirements,
      location: emailData.city,
      emailId: emailId,
    };
    const applicationByCompany = await this.getApplicationByCompany(
      application.company
    );
    if (applicationByCompany) {
      // Check which update is newer
      if (applicationByCompany.updatedAt < applicationDate) {
        await this.updateApplicationByCompany(application);
      }
    } else {
      let newApplication = new this.ApplicationModel({
        _id: mongoose.Types.ObjectId(),
        role: application.role,
        company: application.company,
        location: application.location,
        applicationUrl: application.applicationUrl,
        date: application.date,
        status: application.status,
        createdAt: applicationDate,
        updatedAt: applicationDate,
        emailId: application.emailId,
      });
      newApplication.save();
    }
  }

  /**
   * Exclude from scanning
   * - Emails that are rejected
   *
   * @returns {string} message.id
   */
  async exclusions() {
    const emailIds = await this.ApplicationModel.aggregate([
      { $unwind: "$status" },
      { $match: { "status.value": { $nin: [2, 3] }, emailId: { $ne: null } } },
      { $project: { _id: 0, emailId: 1 } },
    ]).exec();

    return emailIds.flatMap((email) => (email ? email.id : []));
  }

  async genericApplicationParser() {
    const messages = await this.gmailApi.fetchListEmails();

    if (messages.length === 0) {
      throw new Error("No messages found.");
    } else {
      const excludeMessageIds = await this.exclusions();
      for (const message of messages) {
        // Skip if message is in the exclusion list
        // to prevent re-scanning of emails
        if (excludeMessageIds.includes(message.id)) {
          console.log("Excluded message", message.id);
          continue;
        }

        const emailContent = await this.gmailApi.fetchIndividualEmail(
          message.id
        );
        const {
          snippet,
          payload: { parts, headers },
        } = emailContent;

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
          let processedContent = part1.replace(/\\r\\n/, " ");
          processedContent = processedContent.replace(/'/g, "\\'");

          const checkForLetters = /[a-zA-Z]/g.test(snippet);
          if (checkForLetters) {
            try {
              const extractedApplicationData =
                await this.geminiApi.classifyEmails({
                  text: processedContent,
                  subject: subject,
                  id: message.id,
                });
              if (extractedApplicationData) {
                await this.saveApplication(
                  extractedApplicationData,
                  date,
                  message.id
                );
              }
            } catch (error) {
              console.error("Error classifying emails", error, snippet);
              break;
            }
          }
        }
      }
      console.log("Finished processing emails");
    }
  }
}
