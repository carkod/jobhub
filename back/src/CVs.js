import moment from "moment";
import mongoose from "mongoose";
import { CVSchema } from "./Schemas";

// Compile model from schema
const CVModel = mongoose.model("CVModel", CVSchema);
const compare = (a, b) => {
  const splitA = a.date.split("–")[0];
  const A = moment(splitA.split("/").reverse());
  const splitB = b.date.split("–")[0];
  const B = moment(splitB.split("/").reverse());
  return B.diff(A);
};

export default function CVs(app) {
  app.get("/api/cvs", (req, res) => {
    CVModel.find(
      {},
      null,
      { sort: { updatedAt: -1 }, new: true },
      (err, content) => {
        if (err) throw err;
        res.status(200).json(content);
      }
    );
  });

  /**
   * CVs for navigation
   * - Only public status
   * @returns { navName, _id }
   */
  app.get("/api/cvs/navigation", (req, res) => {
    const query = {
      $and: [{ "cats.status": "public" }, { navName: { $exists: true } }],
    };

    CVModel.find(
      query,
      "navName _id cats",
      { sort: { updatedAt: -1 } },
      (err, content) => {
        if (err) {
          res.json({ message: err, error: true });
        }
        res.status(200).json(content);
      }
    );
  });

  app.post("/api/cvs", (req, res) => {
    let r = req.body;

    // Sort by date
    const workExp = r.workExp.sort(compare);
    const educ = r.educ.sort(compare);

    // Upsert model
    let cv = new CVModel({
      name: r.name,
      summary: r.summary,
      navName: r.navName ? r.navName : r.name,
      cats: {
        position: r.cats.position,
        locale: r.cats.locale,
        status: "draft",
      },
      image: r.image,
      persdetails: r.persdetails,
      workExp: workExp,
      educ: educ,
      langSkills: r.langSkills,
      webdevSkills: r.webdevSkills,
      itSkills: r.itSkills,
      other: r.other,
    });
    if (!r._id) {
      // Create New
      cv._id = mongoose.Types.ObjectId();
    }

    const id = r._id || cv._id;
    delete r._id;

    CVModel.update({ _id: id }, cv, { upsert: true }, (err, msg) => {
      if (err) {
        throw err;
      } else {
        if (msg.ok) {
          const savedID = id;
          res.json({ status: !!msg.ok, message: "CV changes saved!" });
        } else {
          res.json({ status: !!msg.ok, message: "No changes" });
        }
      }
    });
  });

  // Copy action
  app.post("/api/cvs/:_id", (req, res) => {
    let r = req.body,
      cv;

    if (req.params._id) {
      cv = new CVModel({
        _id: mongoose.Types.ObjectId(),
        name: r.name,
        summary: r.summary,
        navName: r.navName ? r.navName : r.name,
        cats: {
          position: r.cats.position,
          locale: r.cats.locale,
          status: r.cats.status,
        },
        image: r.image,
        persdetails: r.persdetails,
        workExp: r.workExp,
        educ: r.educ,
        langSkills: r.langSkills,
        webdevSkills: r.webdevSkills,
        itSkills: r.itSkills,
        other: r.other,
      });

      const id = cv._id;
      delete r._id;
      CVModel.create(cv, (err, content) => {
        if (err) throw err;

        if (content !== undefined) {
          res.json({ _id: content._id, message: "Changes successfully saved!" });
        } else {
          res.json({ status: false, message: "No changes" });
        }
      });
    } else {
      const response = {
        message: "Todo could not be copied",
      };

      res.send(response);
    }
  });

  app.get("/api/cvs/:_id", (req, res) => {
    if (req.params._id) {
      CVModel.findById(req.params._id, (err, cv) => {
        if (!err) {
          res.status(200).json({ cv });
        } else {
          res.status(200).json({ message: err });
        }
      });
    } else {
      const response = {
        message: "CV could not be found",
      };

      res.send(response);
    }
  });

  app.delete("/api/cvs/:_id", (req, res) => {
    if (req.params._id) {
      CVModel.findByIdAndRemove(req.params._id, (err, cv) => {
        if (!err) {
          const deletedID = req.params._id;
          res.json({ _id: deletedID });
        } else {
          res.json({ message: err });
        }
      });
    } else {
      const response = {
        message: "CV could not be deleted",
      };

      res.send(response);
    }
  });
}
