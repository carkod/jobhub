//import { ObjectId } from 'mongodb';
import mongoose from "mongoose";
import { CategoriesSchema } from "./Schemas.js";
import { cleanObjectIdString, cleanQueryString } from "./utils.js";

// Compile model from schema
let cats = mongoose.model("categories", CategoriesSchema);

export default function Categories(app, db) {
  app.get("/api/cats", (req, res) => {
    cats.find({}, function (err, content) {
      if (err) {
        res.json({
          error: true,
          message: `Failed to retrieve relationships ${err}`,
        });
      } else {
        res.json(content);
      }
    });
  });

  app.post("/api/cats", (req, res) => {
    const r = req.body;
    const cleanId = cleanObjectIdString(r._id);

    if (r._id && !cleanId) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid category id" });
    }

    let item = new cats({
      _id: cleanId,
      title: r.title,
      label: r.label,
      singLabel: r.singLabel,
      children: r.children,
    });

    if (!r._id) {
      // Create New
      item._id = mongoose.Types.ObjectId();
    }

    const id = cleanId || item._id;
    delete r._id;

    cats.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      item,
      { upsert: true },
      (err, msg) => {
        if (err) throw err;
        if (msg.ok > 0) {
          res.json({
            status: !!msg.ok,
            message: `Categories Update successful! Updated entries: ${msg.n}`,
          });
        } else {
          res.json({ error: !!msg.ok, message: "Failed to Update" });
        }
      },
    );
  });

  // Update by name
  app.post("/api/cats/", (req, res) => {
    const r = req.body;
    const cleanTitle = cleanQueryString(r.title);

    if (!cleanTitle) {
      return res
        .status(400)
        .json({ error: true, message: "Category title is required" });
    }

    let item = new cats({
      _id: r._id || mongoose.Types.ObjectId(),
      title: r.title,
      label: r.label,
      singLabel: r.singLabel,
      children: r.children,
    });

    cats.updateOne(
      { title: cleanTitle },
      item,
      { upsert: true },
      (err, msg) => {
        if (err) {
          res.json({
            error: true,
            message: `Error: ${err}`,
          });
        }
        if (msg.ok > 0) {
          res.json({
            error: false,
            message: `Categories Update successful! Updated entries: ${msg.n}`,
          });
        } else {
          res.json({ error: true, message: "Failed to Update" });
        }
      },
    );
  });

  app.delete("/api/cats/:_id", (req, res) => {
    const cleanId = cleanObjectIdString(req.params._id);

    if (cleanId) {
      cats.deleteOne({ _id: mongoose.Types.ObjectId(cleanId) }, (err, cv) => {
        if (!err) {
          const deletedID = req.params._id;
          res.json({ _id: deletedID });
        } else {
          res.json({ message: err });
        }
      });
    } else {
      const response = {
        message: "Valid id not supplied",
      };

      res.status(400).send(response);
    }
  });
}
