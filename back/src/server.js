import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";
import rateLimit from "express-rate-limit";
import Categories from "./Categories.js";
import CoverLetters from "./CoverLetters.js";
import CVs from "./CVs.js";
import Login from "./Login.js";
import Pdf from "./Pdf";
import Portfolio from "./Portfolio.js";
import Tracker from "./Tracker.js";
import Api from "./Api";
import Blog from "./Blog.js";

if (process.env.GITHUB_ACTIONS !== "true" || !process.env.GITHUB_ACTIONS) {
  dotenv.config({ path: "../.env" });
}

const app = express();

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
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    const connectClient = await mongoose.connect(connectString, mongoOptions);
    const db = connectClient.connection;

    // Security
    app.use(helmet());
    // const limiter = rateLimit({
    //   windowMs: 15 * 60 * 1000, // 15 minutes
    //   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // });

    // Apply the rate limiting middleware to all requests
    // app.use(limiter);

    // Parser Middlewares
    app.use(cors());
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    //Download static files in uploads folder
    app.use(express.static(path.join(__dirname, "../", "/uploads")));
    app.get("/uploads/:filename", (req, res) => {
      res.download(path.join(__dirname, "../", req.url));
    });

    // PDF generator folder
    app.use(express.static(path.join(__dirname, "../", "/docs")));
    app.get("/docs/:filename", (req, res) => {
      res.download(path.join(__dirname, "../", req.url));
    });

    // Unprotected route
    Login(app, db);
    Pdf(app, db);

    // CRUD
    Api(app);
    CVs(app, db);
    CoverLetters(app, db);
    Portfolio(app, db);
    Categories(app, db);
    Tracker(app, db);
    Blog(app, db);

    // app.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Request-Method', '*');
    //   res.header('Access-Control-Request-Headers', 'Content-Type');
    //   res.header("Cross-Origin-Opener-Policy", "unsafe-none");
    //   res.header("Origin-Agent-Cluster", "*");
    //   next();
    // });

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
