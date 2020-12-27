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
    let blog = new BlogModel({
      name: r.name,
      category: r.category,
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
        res.json({ error: true, message: `Blog changes failed to save ${err}`});
      } else {
        res.json({ error: false, message: "Blog changes saved!"});
      }
    });
  });

  app.get("/api/blogs/:_id", (req, res) => {
    if (req.params._id) {
      BlogModel.findById(req.params._id, (err, blog) => {
        if (!err) {
          res.status(200).json({ data: blog, message: "Blog successfully retrieved!", error: false });
        } else {
          res.status(200).json({ message: `Failed to retrieve blog ${err}`, error: true });
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
          res.json({ message: "Blog successfully deleted",  error: false });
        } else {
          res.json({ message: err, error: true });
        }
      });
    } else {
      res.send({ message: `Id missing in the request`, error: true });
    }
  });
}
