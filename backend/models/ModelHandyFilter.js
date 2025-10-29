// models/ModelHandyFilter.js
import mongoose from "mongoose";

// This creates a small "address" structure for handyman info.
// - It has address1, city, and province fields (all text).
// - _id: false means this part won’t get its own MongoDB ID.
// - It's used inside another schema (not a full model by itself).

// _id: false → means we don’t want MongoDB to give each address its own unique ID.
// Why? Because address is just a small part of the main handyman document,
// not a separate object that needs its own ID.

const addressSchema = new mongoose.Schema(
  {
    address1: { type: String },
    city: { type: String },
    province: { type: String },
  },
  { _id: false }
);

// This is the main schema for handyman data.
// - name, email, password → basic account info (email must be unique).
// - age, experience, skills, hourlyRate → personal and job details.
// - distanceRadiusKm → how far the handyman can travel.
// - address → uses the small addressSchema we made earlier.
// - available → shows if the handyman is active (default = true).
// - attributes → extra details like languages, certifications, bio, and last update time.

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

  // Extra schema settings:
  // - timestamps: true → automatically adds createdAt and updatedAt dates.
  // - collection: "handyfilters" → saves all handyman data in this MongoDB collection name.

  {
    timestamps: true,
    collection: "handyfilters",
  }
);

// Prevent model recompilation error

// This creates (or reuses) the "Handyman" model from the schema.
// - mongoose.models.Handyman → reuses model if already made (prevents errors).
// - mongoose.model("Handyman", handyFilterSchema) → makes a new model if not.
// - export default → lets other files import and use this model.
// - the two straight lines || are not a function, they’re a logical OR operator in JavaScript.

// The || means “OR”.
// It checks the first value — if it exists or is true, use it.
// If not, use the second value instead.

const Handyman =
  mongoose.models.Handyman || mongoose.model("Handyman", handyFilterSchema);

export default Handyman;
