// backend/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "handyman_db", // your existing database name (from MongoDB Atlas)
    });
    console.log("✅ Connected to existing handyman_db database");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
