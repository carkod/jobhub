//import { ObjectId } from 'mongodb';
import mongoose from "mongoose";
import { CategoriesSchema } from "./Schemas";

// Compile model from schema
let cats = mongoose.model("categories", CategoriesSchema);

export default function Categories(app, db) {
  app.get("/api/cats", (req, res) => {
    cats.find({}, function (err, content) {
      if (err) throw err;
      //console.log(content)
      res.json(content);
    });
  });

  app.post("/api/cats", (req, res) => {
    const r = req.body;
    let item = new cats({
      _id: r._id,
      title: r.title,
      label: r.label,
      singLabel: r.singLabel,
      children: r.children,
    });

    if (!r._id) {
      // Create New
      item._id = mongoose.Types.ObjectId();
    }

    const id = r._id || item._id;
    delete r._id;

    cats.updateOne({ _id: id }, item, { upsert: true }, (err, msg) => {
      if (err) throw err;
      if (msg.ok > 0) {
        res.json({
          status: !!msg.ok,
          message: `Categories Update successful! Updated entries: ${msg.n}`,
        });
      } else {
        res.json({ error: !!msg.ok, message: "Failed to Update" });
      }
    });
  });

  // Update by name
  app.post("/api/cats/", (req, res) => {
    const r = req.body;
    let item = new cats({
      _id: r._id || mongoose.Types.ObjectId(),
      title: r.title,
      label: r.label,
      singLabel: r.singLabel,
      children: r.children,
    });

    cats.updateOne({ title: r.title }, item, { upsert: true }, (err, msg) => {
      if (err) {
        res.json({
          error: true,
          message: `Error: ${err}`,
        });
      };
      if (msg.ok > 0) {
        res.json({
          error: false,
          message: `Categories Update successful! Updated entries: ${msg.n}`,
        });
      } else {
        res.json({ error: true, message: "Failed to Update" });
      }
    });
  });

  app.delete("/api/cats/:_id", (req, res) => {
    if (req.params._id) {
      cats.deleteOne({_id: req.params._id}, (err, cv) => {
        if (!err) {
          const deletedID = req.params._id;
          res.json({ _id: deletedID });
        } else {
          res.json({ message: err });
        }
      });
    } else {
      const response = {
        message: "Id not supplied",
      };

      res.send(response);
    }
  });
}
