import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

console.log("DB_URI: ", DB_URI);

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}

// connect to DATABASE MONGODB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`connected to Database in ${NODE_ENV} mode`);
  } catch (err) {
    console.error("Error connecting to Database: ", err);
    process.exit(1);
  }
};

export default connectToDatabase;
