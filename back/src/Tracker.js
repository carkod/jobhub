//import { ObjectId } from 'mongodb';
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import { ApplicationSchema, ContactsSchema, StagesSchema } from "./Schemas";

// Compile model from schema
let ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);
let ContactsModel = mongoose.model("ContactsModel", ContactsSchema);
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

export default function Tracker(app, db) {
  app.get("/api/applications/:page/:pagesize", (req, res) => {
    const page = +req.params.page || 0;
    const pagesize = +req.params.pagesize || 0;
    const skip = pagesize * page - pagesize;
    ApplicationModel.find(
      {},
      null,
      { sort: { updatedDate: -1 }, new: true },
      function (err, content) {
        if (err) throw err;
        res.status(200).json(content);
      }
    )
      .skip(skip)
      .limit(pagesize);
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

  app.post("/api/application", (req, res) => {
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

  app.put("/api/application", (req, res) => {
    const r = req.body;
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
    ApplicationModel.findByIdAndUpdate(r._id, applications, (err, msg) => {
      if (err) {
        const newError = new Error(err);
        res.json({ status: false, message: newError });
      } else {
        if (msg.ok) {
          res.status(200).json({ _id: msg.id, message: "Changes successfully saved!" });
        } else {
          res.json({ status: !!msg.ok, message: "No changes" });
        }
      }
    });
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
        message: "Todo could not be deleted deleted",
      };

      res.send(response);
    }
  });
}
