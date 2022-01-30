/**
 * @params {string} mongoose - ODCM used
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserSchema } from "./Schemas";
import dotenv from "dotenv";

dotenv.config();

let UserModel = mongoose.model("HubUsers", UserSchema);

export default function Login(app, db) {
  app.post("/api/login", (req, res) => {
    let r = req.body;
    UserModel.findOne({ email: r.email }, (err, user) => {
      if (err) throw err;
      if (user === null) {
        res.json({ message: "No user found with this email address", error: 1 });
      } else {
        bcrypt.compare(r.password, user.password, function (err, same) {
          if (err) throw err;
          if (same) {
            const savedID = user._id;
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({ email: r.email }, secret, {
              expiresIn: "10h",
            });
            res
              .status(200)
              .json({
                _id: savedID,
                error: 0,
                token: token,
                message: "Login successful!",
              });

          } else {
            res
              .status(400)
              .json({
                _id: user._id,
                status: false,
                message: "Login credentials are not correct.",
              });
          }
        });
        // Found user with same username and password
      }
    });
  });
}
