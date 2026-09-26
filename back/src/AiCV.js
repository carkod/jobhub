import mongoose, { Schema, Types } from "mongoose";
import { CVModel } from "./CVs.js";
import CvGeminiApi from "./services/CvGeminiApi.js";
import { cleanObjectIdString } from "./utils.js";

const AiCvJobSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    business: { type: String, required: true },
    workMode: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      required: true,
    },
    location: String,
    contractType: { type: String, required: true },
    description: { type: String, required: true },
    baselineCvId: { type: Schema.ObjectId, required: true },
    generatedCvId: Schema.ObjectId,
    status: {
      type: String,
      enum: ["new", "in-progress", "completed", "failed"],
      default: "new",
    },
    error: String,
  },
  { timestamps: true },
);

const AiCvJob =
  mongoose.models.AiCvJob || mongoose.model("AiCvJob", AiCvJobSchema);
const requiredFields = [
  "jobTitle",
  "business",
  "workMode",
  "contractType",
  "description",
  "baselineCvId",
];

const generateCv = async (jobRecord, baseline) => {
  try {
    const generated = await new CvGeminiApi().adaptCv(
      baseline.toObject(),
      jobRecord.toObject(),
    );
    const cv = await CVModel.create({
      ...generated,
      _id: new Types.ObjectId(),
    });
    jobRecord.status = "completed";
    jobRecord.generatedCvId = cv._id;
    jobRecord.error = undefined;
    await jobRecord.save();
    return cv;
  } catch (error) {
    jobRecord.status = "failed";
    jobRecord.error = error.message;
    await jobRecord.save();
    throw error;
  }
};

export default function AiCV(app) {
  app.post("/api/ai-cv", async (req, res) => {
    const missing = requiredFields.filter(
      (field) => !String(req.body[field] || "").trim(),
    );
    const baselineId = cleanObjectIdString(req.body.baselineCvId);
    if (missing.length || !baselineId) {
      return res
        .status(400)
        .json({
          error: true,
          message: `Missing or invalid fields: ${missing.join(", ") || "baselineCvId"}`,
        });
    }

    try {
      const baseline = await CVModel.findById(baselineId);
      if (!baseline)
        return res
          .status(404)
          .json({ error: true, message: "Baseline CV not found" });

      const job = await AiCvJob.create({
        ...req.body,
        baselineCvId: baseline._id,
        status: "new",
      });
      const generation = generateCv(job, baseline);
      const timeoutMs = Number(process.env.AI_CV_REQUEST_TIMEOUT_MS) || 50000;
      const outcome = await Promise.race([
        generation.then((cv) => ({ cv })),
        new Promise((resolve) =>
          setTimeout(() => resolve({ timedOut: true }), timeoutMs),
        ),
      ]);

      if (outcome.timedOut) {
        job.status = "in-progress";
        await job.save();
        return res
          .status(200)
          .json({
            jobId: job._id,
            status: job.status,
            message: "CV is being generated. Check back in 10 minutes.",
          });
      }

      return res
        .status(200)
        .json({
          jobId: job._id,
          cv: outcome.cv,
          status: "completed",
          message: "CV is being generated",
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          error: true,
          status: "failed",
          message: `CV generation failed: ${error.message}`,
        });
    }
  });

  app.get("/api/ai-cv/:id", async (req, res) => {
    const id = cleanObjectIdString(req.params.id);
    if (!id)
      return res
        .status(400)
        .json({ error: true, message: "Invalid generation id" });
    const job = await AiCvJob.findById(id);
    if (!job)
      return res
        .status(404)
        .json({ error: true, message: "Generation not found" });
    const cv = job.generatedCvId
      ? await CVModel.findById(job.generatedCvId)
      : null;
    return res
      .status(200)
      .json({ jobId: job._id, status: job.status, error: job.error, cv });
  });
}
