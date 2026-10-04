import mongoose, { Schema, Types } from "mongoose";
import { CVModel } from "./CVs.js";
import CvGeminiApi from "./services/CvGeminiApi.js";
import { cleanObjectIdString, cleanQueryString } from "./utils.js";

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
    prompt: { type: String, required: true },
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
  "prompt",
  "baselineCvId",
];
// Only these fields come from the client. status, generatedCvId and error are server-owned.
const jobFields = [
  "jobTitle",
  "business",
  "workMode",
  "location",
  "contractType",
  "description",
  "prompt",
];
const pickJobFields = (body) =>
  Object.fromEntries(
    jobFields
      .filter((field) => body[field] !== undefined)
      .map((field) => [
        field,
        field === "prompt"
          ? cleanQueryString(body[field], 4000)
          : String(body[field]).trim(),
      ]),
  );
// A job that stays in progress longer than this is treated as lost (e.g. server restart).
const staleAfterMs = () => Number(process.env.AI_CV_STALE_AFTER_MS) || 15 * 60 * 1000;

// generateCv is the only writer of the job document after it is created.
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
    const body = req.body || {};
    const fields = pickJobFields(body);
    const missing = requiredFields.filter(
      (field) =>
        !String(
          field === "baselineCvId" ? body.baselineCvId : fields[field] || "",
        ).trim(),
    );
    const baselineId = cleanObjectIdString(body.baselineCvId);
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
        ...fields,
        baselineCvId: baseline._id,
        status: "in-progress",
      });
      const generation = generateCv(job, baseline);
      const timeoutMs = Number(process.env.AI_CV_REQUEST_TIMEOUT_MS) || 50000;
      let timer;
      const outcome = await Promise.race([
        generation.then((cv) => ({ cv })),
        new Promise((resolve) => {
          timer = setTimeout(() => resolve({ timedOut: true }), timeoutMs);
        }),
      ]).finally(() => clearTimeout(timer));

      if (outcome.timedOut) {
        // Generation continues in the background and records its own result.
        return res
          .status(200)
          .json({
            jobId: job._id,
            status: "in-progress",
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
    try {
      let job = await AiCvJob.findById(id);
      if (!job)
        return res
          .status(404)
          .json({ error: true, message: "Generation not found" });
      const isStale =
        ["new", "in-progress"].includes(job.status) &&
        Date.now() - job.updatedAt.getTime() > staleAfterMs();
      if (isStale) {
        // Conditional update, so a generation that finishes now is not overwritten.
        job =
          (await AiCvJob.findOneAndUpdate(
            { _id: job._id, status: job.status },
            { status: "failed", error: "CV generation did not finish. Try again." },
            { new: true },
          )) || (await AiCvJob.findById(id));
      }
      const cv = job.generatedCvId
        ? await CVModel.findById(job.generatedCvId)
        : null;
      return res
        .status(200)
        .json({ jobId: job._id, status: job.status, error: job.error, cv });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: `Could not read generation: ${error.message}` });
    }
  });
}
