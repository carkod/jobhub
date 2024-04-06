import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import { ApplicationSchema, StagesSchema } from "./Schemas.js";
import EmailParser from "./services/emailParser.js";
import { typedStatus } from "./utils.js";

// Compile model from schema
let ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);
let StagesModel = mongoose.model("StagesModel", StagesSchema);

const fileDir = "uploads/applications";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, fileDir);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
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

export default function Tracker(app, db) {
  app.get("/api/applications", async (req, res) => {
    /**
     * GET applications
     * @params
     * page [number]: optional, discrete number
     * pagesize [number]: optional, discrete number that indicates how many items each page has
     */
    const page = +req.query.page || 1;
    const pagesize = +req.query.pagesize || 0;
    const skip = pagesize * page - pagesize;
    const { status, companyName } = req.query;
    // These should be typed into Schema in the future
    let params = {};

    if (status === "active") {
      params["status.value"] = { $nin: [2, 3] };
    } else if (typedStatus.includes(status)) {
      params["status.text"] = { $in: [capitalize(status)] };
    }

    if (companyName) {
      params["company"] = { $regex: companyName, $options: "i" };
    }

    try {
      let query = await ApplicationModel.find({"status": req.query.companyName}, null, {
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
    let f = req.file;
    // file upload
    fileUpload(req, res, (err) => {
      if (err) throw err;
      if (req.file) {
        const { path } = req.file;
        req.file.url = req.protocol + "://" + req.get("host") + "/" + path;
        res.json(req.file);
      }
    });
  });

  app.post("/api/applications-deupload", (req, res) => {
    let doc = req.body;
    const fileDir = __dirname + "/" + fileDir + doc.fileRawName;
    fs.unlink(fileDir, (err) => {
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

    const { access_token } = req.body;
    const limit = parseInt(req.query.limit) || 100;

    try {
      let emailParser = new EmailParser(access_token, limit);
      await emailParser.genericApplicationParser();
    } catch (e) {
      return res
        .status(e.status)
        .json({ status: false, message: `Error fetching emails: ${e}` });
    }
    let query = await ApplicationModel.find({}, null, {
      sort: { updatedDate: -1 },
    });
    return res.json(query);
  });

  app.post("/api/application", async (req, res) => {
    let r = req.body,
      applications = new ApplicationModel(fillModel(r));
    const id = r._id || applications._id;
    delete r._id;
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
      }
    );
  });

  app.put("/api/application", async (req, res) => {
    const r = req.body;
    const { id } = req.query;
    const applications = {
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
      stages: r.stages,
      location: r.location,
    };
    try {
      let application = await ApplicationModel.findByIdAndUpdate(
        id,
        applications
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
    if (_id) {
      ApplicationModel.findById(_id, (err, application) => {
        if (err) throw err;

        res.json({ _id: _id, status: true, data: application });
      });
    } else {
      res
        .status(200)
        .json({ _id: null, status: !!msg.ok, description: "Item not found" });
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
    if (req.params._id) {
      ApplicationModel.findByIdAndRemove(
        req.params._id,
        (err, applications) => {
          if (!err) {
            const deletedID = req.params._id;
            res.json({ _id: deletedID });
          } else {
            res.json({ message: err });
          }
        }
      );
    } else {
      let response = {
        message: "Please provide _id to delete the application.",
      };

      res.send(response);
    }
  });
}
