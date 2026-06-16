import mongoose from "mongoose";
import { CLSchema } from "./Schemas.js";
import { cleanObjectIdString } from "./utils.js";

// Compile model from schema
let CLModel = mongoose.model("CLModel", CLSchema);

export default function CLs(app, db) {
  app.get("/api/cls", (req, res) => {
    CLModel.find(
      {},
      null,
      { sort: { updatedAt: -1 }, new: true },
      (err, content) => {
        if (err) throw err;
        res.json(content);
      },
    );
  });

  app.post("/api/cls", (req, res) => {
    const r = req.body;
    const cl = new CLModel({
      _id: mongoose.Types.ObjectId(),
      name: r.name ? r.name : "Enter name",
      navName: r.navName ? r.navName : r.name,
      cats: r.cats,
      image: r.image,
      desc: r.desc,
    });

    CLModel.create(cl, (err, msg) => {
      if (err) {
        throw err;
      } else {
        if (msg.ok) {
          res.json({ _id: msg.id, message: "Created new cover letter!" });
        } else {
          res.json({ message: "No changes to cover letter", error: true });
        }
      }
    });
  });

  app.put("/api/cls/:id", (req, res) => {
    let r = req.body;
    // Update
    const cl = new CLModel({
      name: r.name,
      navName: r.navName ? r.navName : r.name,
      cats: {
        position: r.cats.position,
        locale: r.cats.locale,
        status: r.cats.status,
      },
      image: r.image,
      desc: r.desc,
    });

    const cleanId = cleanObjectIdString(req.params.id);

    if (!cleanId) {
      return res
        .status(400)
        .json({ message: "Invalid cover letter id", error: true });
    }

    CLModel.updateOne(
      { _id: mongoose.Types.ObjectId(cleanId) },
      cl,
      {},
      (err, msg) => {
        if (err) res.json({ message: err, error: true });

        if (msg.acknowledged) {
          res
            .status(200)
            .json({ _id: msg.id, message: "Cover letter Updated!" });
        } else {
          res.status(422).json({ message: "No changes upadated" });
        }
      },
    );
  });

  app.get("/api/cls/:_id", (req, res) => {
    const cleanId = cleanObjectIdString(req.params._id);

    if (cleanId) {
      CLModel.findById(mongoose.Types.ObjectId(cleanId), (err, result) => {
        if (!err) {
          res.json({
            data: result,
            message: "Retrieved Cover letter successfully!",
          });
        } else {
          res.json({ message: err });
        }
      });
    } else {
      let response = {
        message: "Valid cover letter id is required",
      };
      res.status(400).send(response);
    }
  });

  // Copy action
  app.post("/api/cls/:_id", (req, res) => {
    let r = req.body,
      cl;

    if (req.params._id) {
      cl = new CLModel({
        _id: mongoose.Types.ObjectId(),
        name: r.name,
        pdf: r.pdf,
        cats: {
          position: r.cats.position,
          locale: r.cats.locale,
          cvCountry: r.cats.cvCountry,
        },
        image: r.image,
        desc: r.desc,
      });

      const id = r._id ? cleanObjectIdString(r._id) : cl._id;
      if (!id) {
        return res
          .status(400)
          .json({ message: "Invalid cover letter id", error: true });
      }

      delete r._id;

      CLModel.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        cl,
        { upsert: true },
        (err, msg) => {
          if (err) {
            throw err;
          } else {
            if (msg.ok) {
              const savedID = id;
              res.json({
                _id: savedID,
                message: "Changes successfully saved!",
              });
            } else {
              res.json({ status: "No changes" });
            }
          }
        },
      );
    } else {
      let response = {
        message: "Todo could not be copied",
      };

      res.send(response);
    }
  });

  app.delete("/api/cls/:_id", (req, res) => {
    let { _id } = req.params;
    const cleanId = cleanObjectIdString(_id);

    if (cleanId) {
      CLModel.deleteOne(
        { _id: mongoose.Types.ObjectId(cleanId) },
        (err, result) => {
          if (err) {
            res.json({ data: result, message: err, error: true });
          } else if (result === null) {
            res.json({ message: "Cover letter not found", error: true });
          } else {
            res.json({
              data: result,
              message: "Deleted cover letter successfully!",
              error: false,
            });
          }
        },
      );
    } else {
      res.status(400).send({ message: "_id incorrect", error: true });
    }
  });
}
