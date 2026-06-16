import express from "express";
import mongoose, { isValidObjectId, Types } from "mongoose";
import { CVSchema, CLSchema } from "./Schemas.js";
import { generatePDF } from "./generator.js";

// Compile model from schema
let CVModel = mongoose.model("CVModel", CVSchema);
let CLModel = mongoose.model("CLModel", CLSchema);

function getPdfConfig(type) {
  if (type === "cover-letter") {
    return {
      model: CLModel,
      title: "cover letter",
      viewType: "cover-letter",
    };
  }

  if (type === "cv" || type === "curriculum-vitae") {
    return {
      model: CVModel,
      title: "curriculum vitae",
      viewType: "curriculum-vitae",
    };
  }

  return null;
}

function getPdfQuery(id) {
  if (isValidObjectId(id)) {
    return { _id: Types.ObjectId(id) };
  }

  return { slug: id };
}

export default function Pdf(app) {
  app.use("/pdf/assets", express.static(__dirname + "/pdf/assets"));
  app.use(
    "/pdf/assets/vendor",
    express.static(__dirname + "/node_modules/semantic-ui-css"),
  );
  app.set("views", __dirname + "/pdf/views");
  app.set("view engine", "pug");

  app.get("/pdf/view/:type/:id/:locale?", (req, res, next) => {
    const { type, locale = "en-GB", id } = req.params;
    const pdfConfig = getPdfConfig(type);
    const template = "index.pug";
    res.setLocale(locale);

    if (!pdfConfig) {
      return res.status(400).send("Unsupported PDF type");
    }

    pdfConfig.model.findOne(getPdfQuery(id), (findErr, content) => {
      if (findErr) {
        res.status(400).send("Unable to retrieve item");
      } else if (content === null) {
        res.status(404).send(`No item found`);
      } else {
        content.type = pdfConfig.viewType;
        content.locale = locale;
        res.render(template, content);
      }
    });
  });

  app.get("/pdf/generate/:type/:id/:locale?", (req, res, next) => {
    const { type, locale = "en-GB", id } = req.params;

    let query;
    if (isValidObjectId(id)) {
      query = {
        _id: id,
      };
    } else {
      // Slug was passed instead of ObjectId
      query = {
        slug: id,
      };
    }

    res.setLocale(locale);

    const pdfConfig = getPdfConfig(type);
    if (!pdfConfig) {
      return res
        .status(400)
        .json({ error: true, message: "Unsupported PDF type" });
    }

    pdfConfig.model.findOne(query, async (err, content) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, message: "Unable to retrieve item" });
      }

      if (!content) {
        return res.status(404).json({ error: true, message: "No item found" });
      }

      const viewPath = `/pdf/view/${encodeURIComponent(
        pdfConfig.viewType,
      )}/${encodeURIComponent(String(content._id))}/${encodeURIComponent(
        locale,
      )}`;
      const updatedDate = new Date(content.updatedAt);
      const date = `${updatedDate.getDate()}/${
        updatedDate.getMonth() + 1
      }/${updatedDate.getFullYear()}`;

      try {
        const file = await generatePDF(viewPath, pdfConfig.title, date);

        res.type("application/pdf");
        res.header("Content-Length", file.length);
        res.status(200).send(file);
      } catch (e) {
        res
          .status(500)
          .json({ error: true, message: "Failed to generate PDF" });
      }
    });
  });
}
