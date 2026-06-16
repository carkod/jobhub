import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import sanitize from "mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";
import { ApplicationSchema, StagesSchema } from "./Schemas.js";
import EmailParser from "./services/emailParser.js";
import {
  escapeRegex,
  safeResolveInside,
  typedStatus,
  uploadFileName,
  uploadFileNameFromDocument,
} from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Compile model from schema
const ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);
const StagesModel = mongoose.model("StagesModel", StagesSchema);

const fileDir = path.join(__dirname, "../", "/uploads/applications");
const uploadFileSizeLimit =
  Number(process.env.UPLOAD_FILE_SIZE_LIMIT) || 25 * 1024 * 1024;

if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, fileDir);
  },
  filename(req, file, cb) {
    cb(null, uploadFileName(file.originalname));
  },
});

const upload = multer({
  limits: { fileSize: uploadFileSizeLimit },
  storage: storage,
});
const fileUpload = upload.single("fieldname");

function fillModel(r) {
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
  return {
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
  };
}

const capitalize = (word) => {
  const lower = word.toLowerCase();
  const capText = word.charAt(0).toUpperCase() + lower.slice(1);
  return capText;
};

function cleanQueryString(value, maxLength = 100) {
  const firstValue = Array.isArray(value) ? value[0] : value;
  if (typeof firstValue !== "string") return "";

  const sanitized = sanitize(firstValue);
  if (typeof sanitized !== "string") return "";

  return sanitized.trim().slice(0, maxLength);
}

function buildCompanyNameFilter(companyName) {
  const cleanCompanyName = cleanQueryString(companyName);
  if (!cleanCompanyName) return null;

  return new RegExp(escapeRegex(cleanCompanyName), "i");
}

function getSafeObjectId(value) {
  if (typeof value !== "string" || !mongoose.Types.ObjectId.isValid(value)) {
    return null;
  }

  return mongoose.Types.ObjectId(value);
}

function getPositiveInteger(value, fallback, max) {
  const parsed = Number.parseInt(Array.isArray(value) ? value[0] : value, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 1) return fallback;

  return Math.min(parsed, max);
}

export default function Tracker(app, db) {
  app.get("/api/applications", async (req, res) => {
    /**
     * GET applications
     * @params
     * page [number]: optional, discrete number
     * pagesize [number]: optional, discrete number that indicates how many items each page has
     */
    const page = getPositiveInteger(req.query.page, 1, 100000);
    const pagesize = getPositiveInteger(req.query.pagesize, 0, 100);
    const skip = pagesize * page - pagesize;
    const { status, companyName } = req.query;
    const cleanStatus = cleanQueryString(status, 40);
    const companyNameFilter = buildCompanyNameFilter(companyName);
    // These should be typed into Schema in the future
    let params = {};

    if (cleanStatus === "active") {
      params["status.value"] = { $nin: [2, 3] };
    } else if (typedStatus.includes(cleanStatus)) {
      params["status.text"] = { $in: [capitalize(cleanStatus)] };
    }

    if (companyNameFilter) {
      params["company"] = companyNameFilter;
    }

    try {
      let query = await ApplicationModel.find(params, null, {
        sort: { updatedAt: -1 },
      });
      if (skip > 0) {
        query.skip(skip);
      }
      const results = query;
      res.json(results);
    } catch (e) {
      res.json({
        status: false,
        message: `Error: ${e}`,
      });
    }
  });

  app.post("/api/applications-upload", (req, res) => {
    // file upload
    fileUpload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message || "Upload failed",
          error: true,
        });
      }

      if (req.file) {
        req.file.url = `${req.protocol}://${req.get(
          "host",
        )}/uploads/applications/${req.file.filename}`;
        res.json(req.file);
      } else {
        res.status(400).json({
          message: "Upload failed! Please upload a file",
          error: true,
        });
      }
    });
  });

  app.post("/api/applications-deupload", (req, res) => {
    let doc = req.body;
    const fileName = uploadFileNameFromDocument(doc);
    const foundDir = safeResolveInside(fileDir, fileName);

    if (!foundDir) {
      return res.status(400).json({
        message: "Invalid file path",
        error: true,
      });
    }

    fs.unlink(foundDir, (err) => {
      if (err) {
        res.json(err);
      } else {
        res.json(doc);
      }
    });
  });

  /**
   * Scans and parses emails to get job applications
   *
   *
   * @param {string} access_token: Google API access token
   * @param {boolean} allPages: optional, first page by default (gmail API)
   */
  app.post("/api/applications/scan", async (req, res) => {
    const { access_token, lastHistoryId, pubSubPayload } = req.body;
    const limit = getPositiveInteger(req.query.limit, 100, 500);

    try {
      const emailParser = new EmailParser(access_token, limit);
      const result = await emailParser.runPipeline({
        lastHistoryId: lastHistoryId || null,
        pubSubPayload: pubSubPayload || null,
      });
      return res.json(result);
    } catch (e) {
      return res
        .status(e.status || 500)
        .json({ status: false, message: `Error fetching emails: ${e}` });
    }
  });

  app.post("/api/application", async (req, res) => {
    const r = req.body || {};
    const providedId = r._id;
    const safeId = providedId ? getSafeObjectId(providedId) : null;

    if (providedId && !safeId) {
      return res
        .status(400)
        .json({ _id: providedId, message: "Invalid application id" });
    }

    const applications = new ApplicationModel(
      fillModel({ ...r, _id: safeId || undefined }),
    );
    const id = safeId || applications._id;
    ApplicationModel.updateOne(
      { _id: id },
      applications,
      { upsert: true },
      (err, msg) => {
        if (err) {
          throw err;
        } else {
          if (msg.ok) {
            const savedID = id;
            res.json({ _id: savedID, status: !!msg.ok });
          } else {
            res.json({ status: !!msg.ok });
          }
        }
      },
    );
  });

  app.put("/api/application", async (req, res) => {
    const r = req.body || {};
    const { id } = req.query;
    const safeId = getSafeObjectId(id);

    if (!safeId) {
      return res
        .status(400)
        .json({ _id: id, message: "Invalid application id" });
    }

    const applications = {
      company: typeof r.company === "string" ? r.company : "",
      status: {
        value:
          r.status && typeof r.status.value === "string" ? r.status.value : "",
        text:
          r.status && typeof r.status.text === "string" ? r.status.text : "",
      },
      role: typeof r.role === "string" ? r.role : "",
      salary: typeof r.salary === "string" ? r.salary : "",
      applicationUrl:
        typeof r.applicationUrl === "string" ? r.applicationUrl : "",
      contacts: Array.isArray(r.contacts) ? r.contacts : [],
      description: typeof r.description === "string" ? r.description : "",
      files: Array.isArray(r.files) ? r.files : [],
      stages: Array.isArray(r.stages) ? r.stages : [],
      location: typeof r.location === "string" ? r.location : "",
    };
    try {
      let application = await ApplicationModel.findOneAndUpdate(
        { _id: { $eq: safeId } },
        applications,
      );
      if (application) {
        res.status(200).json({
          _id: id,
          message: "Application changes successfully saved!",
        });
      } else {
        res
          .status(200)
          .json({ _id: id, message: "Application failed to save!" });
      }
    } catch (err) {
      res.status(400).json({ _id: id, message: err });
    }
  });

  app.get("/api/application/:_id", (req, res) => {
    const { _id } = req.params;
    const safeId = getSafeObjectId(_id);

    if (safeId) {
      ApplicationModel.findById(safeId, (err, application) => {
        if (err) throw err;

        res.json({ _id: _id, status: true, data: application });
      });
    } else {
      res
        .status(400)
        .json({ _id, status: false, description: "Invalid application id" });
    }
  });

  // Copy action
  app.post("/api/applications/:_id", (req, res) => {
    let r = req.body,
      id = req.params._id,
      applications;

    if (id) {
      applications = new ApplicationModel(fillModel(r));
      ApplicationModel.create(applications, (err, msg) => {
        if (err) {
          throw err;
        } else {
          if (msg.ok) {
            const savedID = id;
            res.json({ _id: savedID, status: !!msg.ok });
          } else {
            res.json({ status: !!msg.ok });
          }
        }
      });
    } else {
      let response = {
        message: "Are you sure you are passing a applications with _id?",
      };

      res.send(response);
    }
  });

  app.delete("/api/application/:_id", (req, res) => {
    const safeId = getSafeObjectId(req.params._id);

    if (safeId) {
      ApplicationModel.findByIdAndRemove(safeId, (err, applications) => {
        if (!err) {
          const deletedID = req.params._id;
          res.json({ _id: deletedID });
        } else {
          res.json({ message: err });
        }
      });
    } else {
      let response = {
        message: "Please provide a valid _id to delete the application.",
      };

      res.status(400).send(response);
    }
  });
}
