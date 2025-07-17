
const mongoose = require("mongoose");
require("dotenv").config();

// Use environment variable for DB URI, fallback to local DB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/issueTracker";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[✓] Database connected successfully.");
  } catch (error) {
    console.error("[✗] Failed to connect to database:", error.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectToDatabase;
