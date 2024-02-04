import mongoose from "mongoose";
import { ApplicationSchema } from "../Schemas";

const ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);

function linkedInEmails(message, headers, parts) {
  let application = new ApplicationModel({});
  if (parts) {
    const match = /Your application was sent to (.*?)‌/.exec(message);
    
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

        const applicationUrl = /(https:\/\/\S*)/.exec(extractedText[4]);
        application.role = extractedText[0];
        application.company = extractedText[1];
        application.applicationUrl = applicationUrl[1];
        application.status = status;
      }
    }
  }
  return application;
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
  const subject = headers.find(
    (header) => header.name.toLowerCase() === "from"
  ).value;

  // email parser for applications on LinkedIn
  let linkedInApplicationKeywords = [
    "Your application was sent to",
    "linkedin <jobs-noreply@linkedin.com>",
  ];
  let application = new ApplicationModel({});
  if (
    message.includes(linkedInApplicationKeywords[0]) &&
    subject.toLowerCase() === linkedInApplicationKeywords[1]
  ) {
    application = linkedInEmails(message, headers, parts);
  }

  // email parser for

  return application;
}
