import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserSchema } from "./Schemas.js";
import dotenv from "dotenv";
import { cleanQueryString } from "./utils.js";

dotenv.config();

let UserModel = mongoose.model("HubUsers", UserSchema);

export default function Login(app, db) {
  app.post("/api/login", (req, res) => {
    let r = req.body;
    if (!r || typeof r.email !== "string" || typeof r.password !== "string") {
      return res.status(400).json({
        message: "Email and password are required.",
        error: 1,
      });
    }

    const email = cleanQueryString(r.email, 254);
    if (!email) {
      return res.status(400).json({
        message: "Email and password are required.",
        error: 1,
      });
    }

    UserModel.findOne({ email: email }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Login failed. Please try again.", error: 1 });
      }

      const invalidCredentials = {
        error: 1,
        message: "Login credentials are not correct.",
      };

      if (user === null) {
        res.status(401).json(invalidCredentials);
      } else {
        bcrypt.compare(r.password, user.password, function (err, same) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Login failed. Please try again.", error: 1 });
          }
          if (same) {
            const savedID = String(user._id);
            const secret = process.env.JWT_SECRET;
            if (!secret) {
              return res.status(500).json({
                message: "Login is not configured.",
                error: 1,
              });
            }

            const token = jwt.sign({ email: email }, secret, {
              expiresIn: "10h",
            });
            res.status(200).json({
              _id: savedID,
              error: 0,
              token: token,
              message: "Login successful!",
            });
          } else {
            res.status(401).json(invalidCredentials);
          }
        });
      }
    });
  });
}
