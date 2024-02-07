import mongoose from "mongoose";
import { ApplicationSchema } from "../Schemas";
import GmailApi from "./GmailApi";

const ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);

export function getApplicationByCompany(company) {
  return ApplicationModel.findOne({
    company: { $regex: company, $options: "i" },
  });
}

export function updateApplicationByCompany(application) {
  return ApplicationModel.updateOne(
    {
      company: application.company,
    },
    application
  );
}

export function parseCompanyName(companyName) {
  const words = companyName.split(" ");
  const set = new Set(words);
  // Remove special character
  const trimmedCompanyName = Array.from(set)
    .join(" ")
    .split(" ")
    .filter((x) => x !== "͏");
  return trimmedCompanyName.join(" ");
}

export async function saveApplication(newApplication) {
  // Company is the least information we need to store job application data
  if (newApplication.company) {
    const findCompany = await ApplicationModel.findOne({
      company: newApplication.company,
    });
    if (!findCompany) {
      newApplication._id = mongoose.Types.ObjectId();
      newApplication.save();
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
export async function linkedInEmails(access_token, limit = 100) {
  let application = new ApplicationModel({});
  let linkedInApplicationKeywords = [
    "Your application was sent to",
    "linkedin <jobs-noreply@linkedin.com>",
  ];
  const gmailApi = new GmailApi(access_token, limit);
  const messages = await gmailApi.fetchListEmails(
    linkedInApplicationKeywords[0]
  );

  if (messages.length === 0) {
    throw new Error("No messages found.");
  } else {
    for (const message of messages) {
      const {
        snippet,
        payload: { parts, headers },
      } = await gmailApi.fetchIndividualEmail(message.id);

      const subject = headers.find(
        (header) => header.name.toLowerCase() === "from"
      ).value;
      const date = headers.find(
        (date) => date.name.toLowerCase() === "date"
      ).value;

      if (
        snippet.includes(linkedInApplicationKeywords[0]) &&
        subject.toLowerCase() === linkedInApplicationKeywords[1]
      ) {
        if (parts) {
          const match = /Your application was sent to (.*?)‌/.exec(snippet);

          if (match.length === 2) {
            const jobDetails = Buffer.from(
              parts[0].body.data,
              "base64"
            ).toString("utf-8");
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
              application.role = extractedText[0];
              application.company = extractedText[1];
              application.location = extractedText[2];
              application.applicationUrl = applicationUrl[1];
              application.date = date;
              application.status = status;
              application.stages = [firstStage];
            }
          }
        }
      }

      // Company is the least information we need to store job application data
      if (application.company) {
        saveApplication(application);
      }
    }
  }
}

export async function linkedinRejectedApplications(access_token, limit = 100) {
  let application = new ApplicationModel({});
  let linkedInRejectionKeywords = [
    "Your application to",
    "linkedin <jobs-noreply@linkedin.com>",
  ];

  const gmailApi = new GmailApi(access_token, limit);
  const messages = await gmailApi.fetchListEmails(linkedInRejectionKeywords[0]);

  if (messages.length === 0) {
    throw new Error("No messages found.");
  } else {
    for (const message of messages) {
      const {
        snippet,
        payload: { parts, headers },
      } = await gmailApi.fetchIndividualEmail(message.id);

      const subject = headers.find(
        (header) => header.name.toLowerCase() === "from"
      ).value;
      const date = headers.find(
        (date) => date.name.toLowerCase() === "date"
      ).value;

      if (
        snippet.includes(linkedInRejectionKeywords[0]) &&
        subject.toLowerCase() === linkedInRejectionKeywords[1]
      ) {
        if (parts) {
          const part1 = Buffer.from(parts[0].body.data, "base64").toString(
            "utf-8"
          );
          if (part1.includes("email_jobs_application_rejected")) {
            const match = /Your application to\s+(.*?)\s+at\s+(.*)/.exec(
              snippet
            );
            if (match && match.length === 3) {
              const companyName = parseCompanyName(match[2]);
              const applicationByCompany = await getApplicationByCompany(
                companyName
              );
              if (
                applicationByCompany &&
                applicationByCompany.role.toLowerCase() ===
                  match[1].toLowerCase()
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
      }
    }
  }
}

export default function emailParser(message, headers, parts) {
  // console.log('message', message);
  const appliedKeywords = [
    "Thank you for your application for the position of",
    "Thank you for applying for the",
    "Thank you for applying for the role of",
    "Your job application",
    "Your application was sent to",
  ];
  const inProgressKeywords = ["was viewed by"];
  const rejectedKeywords = ["I regret to inform you"];
  const recruitmentCompaniesEmails = [];

  // email parser for

  return application;
}
