import mongoose from "mongoose";
import { BlogSchema } from "./Schemas";

// Compile model from schema
const BlogModel = mongoose.model("BlogModel", BlogSchema);

export default function Blog(app) {
  app.get("/api/blogs", (req, res) => {
    BlogModel.find(
      {},
      null,
      { sort: { updatedAt: -1 }, new: true },
      (err, content) => {
        if (err) throw err;
        res.status(200).json(content);
      }
    );
  });

  app.post("/api/blogs", (req, res) => {
    let r = req.body;

    // Upsert model
    const blog = new BlogModel({
      title: r.title,
      categories: r.categories,
      tags: r.tags,
      content: r.content,
    });
    if (!r._id) {
      // Create New
      blog._id = mongoose.Types.ObjectId();
    }

    const id = r._id || blog._id;
    delete r._id;

    BlogModel.update({ _id: id }, blog, { upsert: true }, (err, msg) => {
      if (err) {
        throw err;
      } else {
        if (msg.ok) {
          const savedID = id;
          res.json({ status: !!msg.ok, message: "blog changes saved!" });
        } else {
          res.json({ status: !!msg.ok });
          console.log("No changes");
        }
      }
    });
  });

  app.get("/api/blogs/:_id", (req, res) => {
    if (req.params._id) {
      BlogModel.findById(req.params._id, (err, blog) => {
        if (!err) {
          res.status(200).json({ blog });
        } else {
          res.status(200).json({ message: err });
        }
      });
    } else {
      const response = {
        message: "blog could not be found",
      };

      res.send(response);
    }
  });

  app.delete("/api/blogs/:_id", (req, res) => {
    if (req.params._id) {
      BlogModel.findByIdAndRemove(req.params._id, (err, blog) => {
        if (!err) {
          const deletedID = req.params._id;
          res.json({ _id: deletedID });
        } else {
          res.json({ message: err });
        }
      });
    } else {
      const response = {
        message: "Todo could not be deleted deleted",
      };

      res.send(response);
    }
  });
}
