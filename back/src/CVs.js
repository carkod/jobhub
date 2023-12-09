import moment from "moment";
import mongoose, { isValidObjectId, Types } from "mongoose";
import sanitize from "mongo-sanitize";
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
  app.get("/api/cvs", async (req, res) => {
    try {
      let cvs = await CVModel.find({}, null,
        { sort: { updatedAt: -1 }}
      );
      res.status(200).json(cvs);
    } catch(err) {
      res.status(400).json(err);
    }
  });

  /**
   * CVs for navigation
   * - Only public status
   * @returns { navName, _id }
   */
  app.get("/api/cvs/navigation", async (req, res) => {
    const query = {
      $and: [{ "cats.status": "public" }, { navName: { $exists: true } }],
    };

    try {
      let cvs = await CVModel.find(
        query,
        "navName _id cats slug",
        { sort: { updatedAt: -1 } },
      );
      res.json(cvs);
    } catch (err) {
      res.json({ message: err, error: true });
    }
  });

  app.post("/api/cvs", async (req, res) => {
    let r = req.body;

    // Sort by date
    const workExp = r.workExp.sort(compare);
    const educ = r.educ.sort(compare);

    // Upsert model
    let cv = new CVModel({
      name: r.name,
      slug: r.slug,
      summary: r.summary,
      navName: r.navName ? r.navName : r.name,
      cats: {
        position: r.cats.position,
        locale: r.cats.locale,
        status: r.cats.status ? r.cats.status : "draft",
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
    let query = {}
    if (isValidObjectId(r._id)) {
      query = { _id: r._id };
    } else {
      query = { _id: mongoose.Types.ObjectId() }
    }
    
    try {
      let cvs = await CVModel.findOneAndUpdate(query, cv, {upsert: true});
      if (cvs) {
        res.json({ status: true, message: "CV changes saved!" });
      } else {
        res.json({ status: true, message: "No changes" });
      }

    } catch(err) {
      res.json({ message: `Failed to create CV: ${err}`, error: true });
    }
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
    if (isValidObjectId(req.params._id)) {
      CVModel.findOne({ _id: Types.ObjectId(req.params._id)}, (err, cv) => {
        if (!err) {
          res.status(200).json({ cv });
        } else {
          res.status(200).json({ message: err });
        }
      });
    } else if (req.params._id === undefined) {
      const response = {
        message: "CV could not be found",
      };
      res.send(response);
    } else {
      CVModel.findOne({ slug: req.params._id}, (err, cv) => {
        if (!err) {
          res.status(200).json({ cv });
        } else {
          res.status(200).json({ message: err });
        }
      });
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
