//import { ObjectId } from 'mongodb';
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { ProjectSchema } from "./Schemas";
dotenv.config();

const host = process.env.ENV_PROD;

// Compile model from schema
let ProjectModel = mongoose.model("ProjectModel", ProjectSchema);
const fileDir = path.join(__dirname, "../", "/uploads");

// Create file directory if not exists
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir);
}
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, fileDir);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ filesize: 500000, storage: storage });
const fileUpload = upload.single("fieldname");

export default function Portfolio(app, db) {
  app.get("/api/portfolio", (req, res) => {
    ProjectModel.find(
      {},
      null,
      { sort: { updatedDate: -1 }, new: true },
      function (err, content) {
        if (err) throw err;
        res.status(200).json(content);
      }
    );
  });

  /**
   * Portfolio for navigation
   * - Only public status
   * - Grouped by category
   * @returns { categoryname, _id, cats }
   */
  app.get("/api/portfolio/navigation", (req, res) => {
    const query = {
      $and: [{ "cats.status": "public" }],
    };

    ProjectModel.find(
      query,
      null,
      { sort: { updatedAt: -1 } },
      (err, content) => {
        if (err) {
          res.json({ message: err, error: true });
        }
        res.status(200).json(content);
      }
    );
  });

  app.post("/api/portfolio/upload", fileUpload, (req, res) => {
    let f = req.file;
    if (!f) {
      res.json({
        message: "Upload failed! Please upload a file",
        error: true,
      });
    } else {
      f.url = `${req.protocol}://${req.get("host")}/uploads/${f.filename}`;
      res.json({
        message: "Upload successful!",
        error: false,
        data: f.url,
      });
    }
  });

  app.post("/api/portfolio/deupload", (req, res) => {
    let doc = req.body;
    const foundDir = `${fileDir}/${doc.fileName}`;
    fs.unlink(foundDir, (err) => {
      if (err) {
        res.json({
          message: `${err}`,
          error: true,
          data: doc,
        });
      } else {
        res.json({
          message: `File removed successfully!`,
          error: false,
          data: doc,
        });
      }
    });
  });

  app.post("/api/portfolio/project", (req, res) => {
    let r = req.body,
      project = new ProjectModel({
        _id: mongoose.Types.ObjectId(),
        name: r.name || "Enter name",
        cats: {
          position: "",
          locale: "en-GB",
          status: "draft",
        },
        image: "",
        desc: "",
        documents: [],
        links: [],
      });
    ProjectModel.create(project, (err, msg) => {
      if (err) {
        throw err;
      } else {
        if (msg.ok) {
          const savedID = id;
          res.json({ _id: savedID, message: "Changes successfully saved!" });
        } else {
          res.json({ message: "No changes" });
        }
      }
    });
  });

  app.put("/api/portfolio/project", (req, res) => {
    let r = req.body;
    // Update
    const project = new ProjectModel({
      _id: r._id,
      name: r.name,
      slug: r.slug,
      cats: {
        position: r.cats.position,
        locale: r.cats.locale,
        cvCountry: r.cats.cvCountry,
        status: r.cats.status,
      },
      image: r.image,
      desc: r.desc,
      documents: r.documents,
      links: r.links,
    });

    ProjectModel.updateOne({ _id: r._id }, project, (err, msg) => {
      if (err) {
        const newError = new Error(err);
        res.json({ error: false, message: newError });
      } else if (msg === null) {
        res.json({ error: false, message: "Project not found!" });
      } else {
        res
          .status(200)
          .json({
            data: msg.id,
            error: false,
            message: "Project saved successfully!",
          });
      }
    });
  });

  app.get("/api/project/:_id", (req, res) => {
    if (req.params._id) {
      ProjectModel.findById(req.params._id, (err, result) => {
        if (err) {
          res.json({ message: err, error: true });
        } else if (result === null) {
          res.json({ message: "Project not found!", error: true });
        } else {
          res.json({
            data: result,
            message: "Project retrieved successfully!",
          });
        }
      });
    } else {
      let response = {
        message: "Item could not be found",
      };

      res.send(response);
    }
  });

  // Copy action
  app.post("/api/portfolio/:_id", (req, res) => {
    let r = req.body,
      id = req.params._id,
      project;

    if (id) {
      project = new ProjectModel({
        _id: mongoose.Types.ObjectId(),
        name: r.name,
        slug: r.slug,
        cats: {
          position: r.cats.position,
          locale: r.cats.locale,
          cvCountry: r.cats.cvCountry,
        },
        image: r.image,
        desc: r.desc,
        documents: r.documents,
        links: r.links,
      });
      ProjectModel.create(project, (err, msg) => {
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
        message: "Are you sure you are passing a project with _id?",
      };

      res.send(response);
    }
  });

  app.delete("/api/project/:_id", (req, res) => {
    if (req.params._id) {
      ProjectModel.findByIdAndRemove(req.params._id, (err, project) => {
        if (!err) {
          const deletedID = req.params._id;
          res.json({ _id: deletedID });
        } else {
          res.json({ message: err });
        }
      });
    } else {
      let response = {
        message: "Todo could not be deleted deleted",
      };

      res.send(response);
    }
  });
}
