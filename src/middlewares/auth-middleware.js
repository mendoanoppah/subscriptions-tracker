import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user-model.js";

export default async function authorized(req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // console.log("Received token:", token);
    // console.log("JWT_SECRET:", JWT_SECRET);

    const decode = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded token:", decode);

    const user = await User.findById(decode.userId);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
}
