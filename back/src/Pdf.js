import express from "express";
import mongoose from "mongoose";
import { CVSchema, CLSchema } from "./Schemas";
import { generatePDF } from "./generator";

// Compile model from schema
let CVModel = mongoose.model("CVModel", CVSchema);
let CLModel = mongoose.model("CLModel", CLSchema);

export default function Pdf(app) {
  app.use("/pdf/assets", express.static(__dirname + "/pdf/assets"));
  app.use(
    "/pdf/assets/vendor",
    express.static(__dirname + "/node_modules/semantic-ui-css")
  );
  app.set("views", __dirname + "/pdf/views");
  app.set("view engine", "pug");

  app.get("/pdf/view/:type/:id/:locale?", (req, res, next) => {
    const { type, locale="en-GB", id } = req.params;
    let Model = CVModel;
    const template = "index.pug";
    res.setLocale(locale)

    if (type === "cover-letter") {
      Model = CLModel;
    }

    Model.findOne({ _id: id }, (findErr, content) => {
      if (findErr) {
        res.send(`Error: ${findErr}`);
      } else if (content === null) {
        res.send(`No item found`);
      } else {
        content.type = type;
        content.locale = locale;
        res.render(template, content);
      }
    });
  });

  app.get("/pdf/generate/:type/:id/:locale?", (req, res, next) => {

    const { type, locale="en-GB", id } = req.params;
    res.setLocale(locale);
    res.type("application/pdf");

    let Model = CVModel;

    if (type === "cover-letter") {
      Model = CLModel;
    }

    let title = type.replace("-", " ");

    Model.findOne({ _id: id }, async (err, content) => {
      if (err) throw err;
      const url = `${req.protocol}://${req.get("host")}/pdf/view/${type}/${
        content._id
      }/${locale}`;
      const updatedDate = new Date(content.updatedAt);
      const date = `${updatedDate.getDate()}/${
        updatedDate.getMonth() + 1
      }/${updatedDate.getFullYear()}`;

      const file = await generatePDF(url, title, date);

      res.header("Content-Length", file.length);
      res.status(200).send(file);
    });
  });
}
