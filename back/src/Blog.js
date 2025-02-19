import { isValidObjectId, Types, model } from "mongoose";
import sanitize from "mongo-sanitize";
import { BlogSchema } from "./Schemas.js";
import { apiRequest } from "./utils.js";

// Compile model from schema
const BlogModel = model("BlogModel", BlogSchema);

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
    const postOnMedium = /true/i.test(req.query.postOnMedium) || false;
    let r = req.body;

    let blog = {
      name: r.name,
      slug: r.slug,
      category: r.category,
      tags: r.tags,
      content: r.content,
      status: r.status,
    };

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
      try {
        const id = sanitize(r.id);
        let query = {};
        if (isValidObjectId(id)) {
          query._id = id;
        } else {
          query.slug = {
            $eq: r.slug,
          };
        }

        let mediumLink = null;

        if (postOnMedium) {
          // Post to Medium
          const url =
            "https://api.medium.com/v1/users/1e18e864a434709082c2ad7db7b96ecc5786aac215a18f07f97aec4f73bea5a84/posts";

          const data = {
            title: blog.name,
            contentFormat: "markdown",
            content: blog.content,
            canonicalUrl: `https://carlos.wf/blog/${blog.slug}`,
            tags: blog.tags,
            publishStatus: "public",
          };
          // Fix compiler error
          // which results in .concat(process.env.MEDIUM_API_TOKEN)
          const mediumApiToken = process.env.MEDIUM_API_TOKEN;
          const httpHeaders = {
            Authorization: `Bearer ${mediumApiToken}`,
            "Content-Type": "application/json",
          };
          const headers = new Headers(httpHeaders);
          const response = await apiRequest(
            url,
            "POST",
            JSON.stringify(data),
            headers
          );
          mediumLink = response.data.url;
        }

        await BlogModel.updateOne(query, {
          name: sanitize(r.name),
          category: sanitize(r.category),
          tags: r.tags,
          content: sanitize(r.content),
          status: sanitize(r.status),
          mediumLink: mediumLink,
        });

        res.json({ error: false, message: "Blog changes saved!" });
      } catch (err) {
        console.log("Posting to Medium", err.message);
        res.json({
          error: true,
          message: `Blog changes failed to save ${err}`,
        });
      }
    }
  });

  app.get("/api/blog/:_id", (req, res) => {
    if (isValidObjectId(req.params._id)) {
      BlogModel.findOne(
        { _id: Types.ObjectId(req.params._id) },
        (err, blog) => {
          if (!err) {
            res.status(200).json({
              data: blog,
              message: "Blog successfully retrieved!",
              error: false,
            });
          } else {
            res
              .status(200)
              .json({ message: `Failed to retrieve blog ${err}`, error: true });
          }
        }
      );
    } else if (req.params._id === undefined) {
      const response = {
        message: "blog could not be found",
      };
      res.send(response);
    } else {
      BlogModel.findOne({ slug: req.params._id }, (err, blog) => {
        if (!err) {
          res.status(200).json({
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
          res.status(200).json({
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
          res.status(200).json({
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
