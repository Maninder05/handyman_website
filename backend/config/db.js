// backend/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Check if MONGO_URI exists
    const mongoURI = process.env.MONGO_URI || process.env.MONGO_URL;

    if (!mongoURI) {
      console.error("❌ ERROR: MONGO_URI is not defined in .env file!");
      console.error("📝 Please add this to your .env file:");
      console.error(
        "MONGO_URI=mongodb+srv://jaspreet_singh:Binarybrains_07@handyman-web.rsrnjpk.mongodb.net/handyman_db?retryWrites=true&w=majority"
      );
      process.exit(1);
    }

    await mongoose.connect(mongoURI, {
      dbName: "handyman_db",
    });

    console.log("✅ Connected to MongoDB Atlas - handyman_db database");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
