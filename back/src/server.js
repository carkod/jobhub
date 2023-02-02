import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import { I18n } from "i18n";
import mongoose from "mongoose";
import path from "path";
import Api from "./Api";
import Blog from "./Blog.js";
import Categories from "./Categories.js";
import CoverLetters from "./CoverLetters.js";
import CVs from "./CVs.js";
import Login from "./Login.js";
import Pdf from "./Pdf";
import Portfolio from "./Portfolio.js";
import Tracker from "./Tracker.js";

if (process.env.GITHUB_ACTIONS !== "true" || !process.env.GITHUB_ACTIONS) {
  dotenv.config({ path: "../.env" });
}

const app = express();
const interationalization = new I18n({
  locales: ["es-ES"],
  directory: path.join(__dirname, "locales"),
});

const appFactory = async (app) => {
  try {
    // Setup database
    const connectString = `mongodb://${process.env.MONGO_AUTH_USERNAME}:${
      process.env.MONGO_AUTH_PASSWORD
    }@${process.env.HOST || process.env.HOSTNAME}:27017/${
      process.env.MONGO_DATABASE
    }?authSource=admin`;
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    const connectClient = await mongoose.connect(connectString, mongoOptions);
    const db = connectClient.connection;

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      skip: (req, res) => (process.env.HOST === "localhost" || process.env.HOSTNAME === "localhost")
    });
    app.use(limiter); // Apply the rate limiting middleware to all requests

    // translations
    app.use(interationalization.init);

    // Cors for complex objects
    // Start first to avoid browser errors
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
    });

    // Parser Middlewares. Increase file upload limit
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    //Download static files in uploads folder
    app.use(express.static(path.join(__dirname, "../", "/uploads")));
    app.get("/uploads/:filename", (req, res) => {
      res.download(path.join(__dirname, "../", req.url));
    });

    Pdf(app);
    Login(app, db);

    //CRUD
    Api(app);
    CVs(app, db);
    CoverLetters(app, db);
    Portfolio(app, db);
    Categories(app, db);
    Tracker(app, db);
    Blog(app, db);

    app.listen(process.env.BACK_PORT, () =>
      console.warn(
        `Server is running on ${process.env.HOST || process.env.HOSTNAME}:${
          process.env.BACK_PORT
        }`
      )
    );
  } catch (e) {
    console.error(`MongoDB connection error: ${e}`);
  }
};

appFactory(app);
