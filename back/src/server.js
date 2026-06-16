import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import { I18n } from "i18n";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import mongoSanitize from "express-mongo-sanitize";
import Api from "./Api.js";
import Blog from "./Blog.js";
import Categories from "./Categories.js";
import CoverLetters from "./CoverLetters.js";
import CVs from "./CVs.js";
import Login from "./Login.js";
import Pdf from "./Pdf.js";
import Portfolio from "./Portfolio.js";
import Tracker from "./Tracker.js";
import { safeResolveInside } from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.GITHUB_ACTIONS !== "true" || !process.env.GITHUB_ACTIONS) {
  dotenv.config({ path: "../.env" });
}

const app = express();
app.disable("x-powered-by");

const interationalization = new I18n({
  locales: ["es-ES"],
  directory: path.join(__dirname, "locales"),
});

const getCorsOrigins = () =>
  (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const setSecurityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
};

const setCorsHeaders = (req, res, next) => {
  const allowedOrigins = getCorsOrigins();
  const origin = req.headers.origin;
  const allowAnyOrigin =
    allowedOrigins.length === 0 || allowedOrigins.includes("*");

  if (allowAnyOrigin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"] ||
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};

const appFactory = async (app) => {
  try {
    // Prepare for Mongoose 7 migration and supress warning
    mongoose.set("strictQuery", false);
    // Setup database
    const mongoHost =
      process.env.MONGO_HOST || process.env.HOST || process.env.HOSTNAME;
    const mongoPort = process.env.MONGO_PORT || 27017;
    const mongoUsername = encodeURIComponent(process.env.MONGO_AUTH_USERNAME);
    const mongoPassword = encodeURIComponent(process.env.MONGO_AUTH_PASSWORD);
    const connectString = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${process.env.MONGO_DATABASE}?authSource=admin`;
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(connectString, mongoOptions);
    const db = mongoose.connection;

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      skip: (req, res) =>
        process.env.HOST === "localhost" ||
        process.env.HOSTNAME === "localhost",
    });
    app.use(limiter); // Apply the rate limiting middleware to all requests
    app.use(setSecurityHeaders);

    // translations
    app.use(interationalization.init);

    app.use(setCorsHeaders);

    // sanitization
    app.use(mongoSanitize());

    // Parser Middlewares. Increase file upload limit
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    // Download static files in uploads folder
    const uploadDir = path.join(__dirname, "../", "/uploads");
    app.use(
      express.static(uploadDir, {
        dotfiles: "deny",
        index: false,
      }),
    );
    app.get("/uploads/:filename", (req, res) => {
      const uploadPath = safeResolveInside(uploadDir, req.params.filename);
      if (!uploadPath) {
        return res.status(400).json({ error: true, message: "Invalid file" });
      }

      return res.download(uploadPath);
    });
    app.get("/uploads/applications/:filename", (req, res) => {
      const uploadPath = safeResolveInside(
        path.join(uploadDir, "applications"),
        req.params.filename,
      );
      if (!uploadPath) {
        return res.status(400).json({ error: true, message: "Invalid file" });
      }

      return res.download(uploadPath);
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
        }`,
      ),
    );
  } catch (e) {
    console.error(`MongoDB connection error: ${e}`);
  }
};

appFactory(app);
