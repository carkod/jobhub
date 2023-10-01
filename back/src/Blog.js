import mongoose, { isValidObjectId, Types } from "mongoose";
import sanitize from "mongo-sanitize";
import { BlogSchema } from "./Schemas";

// Compile model from schema
const BlogModel = mongoose.model("BlogModel", BlogSchema);

export default function Blog(app) {
  app.get("/api/blogs/:page?/:pagesize?", (req, res) => {
    const page = +req.params.page || 0;
    const pagesize = +req.params.pagesize || 0;
    const skip = pagesize * page - pagesize;
    BlogModel.find(
      {},
      null,
      { sort: { updatedAt: -1 }, new: true },
      (err, content) => {
        if (err) throw err;
        res.status(200).json(content);
      }
    )
      .skip(skip)
      .limit(pagesize);
  });

  app.post("/api/blogs", async (req, res) => {
    let r = req.body;

    let blog = {
      name: r.name,
      slug: r.slug,
      category: r.category,
      tags: r.tags,
      content: r.content,
      status: r.status
    }

    if (r.id == undefined) {
      // Create New
      try {
        await BlogModel.create(blog);
        res.json({ error: false, message: "New blog post created!" });
      } catch (err) {
        res.json({
          error: true,
          message: `Blog failed to create ${err}`,
        });
      }
    } else {
      const id = sanitize(r.id);
      try {
        await BlogModel.updateOne({_id: id}, {
          name: r.name,
          slug: r.slug,
          category: r.category,
          tags: r.tags,
          content: r.content,
          status: r.status
        });
        res.json({ error: false, message: "Blog changes saved!" });
      } catch (err) {
        res.json({
          error: true,
          message: `Blog changes failed to save ${err}`,
        });
      }
    }

  });

  app.get("/api/blog/:_id", (req, res) => {
    if (isValidObjectId(req.params._id)) {
      BlogModel.findOne({ _id: Types.ObjectId(req.params._id) }, (err, blog) => {
        if (!err) {
          res
            .status(200)
            .json({
              data: blog,
              message: "Blog successfully retrieved!",
              error: false,
            });
        } else {
          res
            .status(200)
            .json({ message: `Failed to retrieve blog ${err}`, error: true });
        }
      });
    } else if (req.params._id === undefined) {
      const response = {
        message: "blog could not be found",
      };
      res.send(response);
    } else {
      BlogModel.findOne({ slug: req.params._id }, (err, blog) => {
        if (!err) {
          res
            .status(200)
            .json({
              data: blog,
              message: "Blog successfully retrieved!",
              error: false,
            });
        } else {
          res
            .status(200)
            .json({ message: `Failed to retrieve blog ${err}`, error: true });
        }
      });
    }
  });

  app.delete("/api/blogs/:_id", (req, res) => {
    if (req.params._id) {
      BlogModel.deleteOne({ _id: req.params._id }, (err, blog) => {
        if (!err) {
          res.json({ message: "Blog successfully deleted", error: false });
        } else {
          res.json({ message: err, error: true });
        }
      });
    } else {
      res.send({ message: `Id missing in the request`, error: true });
    }
  });

  // Find by title
  app.get("/api/blogs/name/:name", (req, res) => {
    if (req.params.name) {
      BlogModel.findOne({ name: req.params.name }, (err, blog) => {
        if (!err) {
          res
            .status(200)
            .json({
              data: blog,
              message: "Blog successfully retrieved!",
              error: false,
            });
        } else {
          res
            .status(200)
            .json({ message: `Failed to retrieve blog ${err}`, error: true });
        }
      });
    } else {
      const response = {
        message: "blog could not be found",
      };

      res.send(response);
    }
  });

  // Find by topic
  app.get("/api/blogs/category/:category", (req, res) => {
    if (req.params.category) {
      BlogModel.findOne({ category: req.params.category }, (err, blog) => {
        if (!err) {
          res
            .status(200)
            .json({
              data: blog,
              message: "Blog successfully retrieved!",
              error: false,
            });
        } else {
          res
            .status(200)
            .json({ message: `Failed to retrieve blog ${err}`, error: true });
        }
      });
    } else {
      const response = {
        message: "blog could not be found",
      };

      res.send(response);
    }
  });
}
