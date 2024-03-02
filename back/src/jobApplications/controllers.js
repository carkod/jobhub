/**
 * Controllers for jobApplications
 *
 * These are functions, utilities and middlewares
 * that are between the DB and the routes.
 */

import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import { ApplicationSchema, StagesSchema } from "./Schemas.js";
import EmailParser from "./services/emailParser.js";
import { typedStatus, capitalize } from "../utils.js";

let StagesModel = mongoose.model("StagesModel", StagesSchema);
let ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);

const fileDir = "uploads/applications";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, fileDir);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
export const fileUpload = upload.single("fieldname");

export function fillModel(r) {
  const stages = new StagesModel({
    _id: r._id || mongoose.Types.ObjectId(),
    order: r.order,
    completed: r.completed,
    action: r.action,
    dept: r.dept,
    startDate: r.startDate,
    endDate: r.endDate,
  });
  const sortStages = (stages) => {
    return stages.sort(({ order: a }, { order: b }) => {
      return a - b;
    });
  };
  const newApplication = new ApplicationModel({
    // Create new || Update
    _id: r._id || mongoose.Types.ObjectId(),
    company: r.company,
    status: {
      value: r.status.value,
      text: r.status.text,
    },
    role: r.role,
    salary: r.salary,
    applicationUrl: r.applicationUrl,
    contacts: r.contacts,
    description: r.description,
    files: r.files,
    stages: sortStages(r.stages),
    location: r.location,
  });
  return newApplication;
}

export function saveApplication(applicationModel) {
  return applicationModel.save();
}

export function deleteApplication({field, value}) {
  return ApplicationModel.deleteOne({field: value});
}
