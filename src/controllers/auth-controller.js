import mongoose from "mongoose";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      name,
    });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashingPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashingPassword,
        },
      ],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    // console.log("Generated token:", token);

    await session.commitTransaction();
    session.endSession();

    const userData = newUsers[0].toObject();
    delete userData.password, delete userData.__v;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        User: userData,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      const error = new Error("User is not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("invalid password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed is successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// "no-unused-vars": "off"
// eslint-disable-next-line no-unused-vars
export const signOut = async (_req, res, next) => {};
