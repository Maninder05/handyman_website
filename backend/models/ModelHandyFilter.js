// models/ModelHandyFilter.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address1: { type: String },
    city: { type: String },
    province: { type: String },
  },
  { _id: false }
);

const handyFilterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: { type: Number },
    experience: { type: Number },
    skills: [{ type: String }],
    hourlyRate: { type: Number },
    distanceRadiusKm: { type: Number },
    address: addressSchema,
    available: { type: Boolean, default: true },
    attributes: {
      languages: [String],
      certifications: [String],
      bio: String,
      updatedAt: String,
    },
  },
  {
    timestamps: true,
    collection: "handyfilters",
  }
);

// Prevent model recompilation error
const Handyman =
  mongoose.models.Handyman || mongoose.model("Handyman", handyFilterSchema);

export default Handyman;
