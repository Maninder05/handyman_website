// models/Handyman.js
import mongoose from "mongoose";

const HandySchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  age: { type: Number },
  experience: { type: Number }, // years
  hourlyRate: { type: Number, default: 0 },
  distanceRadiusKm: { type: Number, default: 10 },
  skills: [{ type: String }], // array of skill names
  attributes: { type: mongoose.Schema.Types.Mixed }, // flexible object for extra attributes
  createdAt: { type: Date, default: Date.now },
});

const Handyman = mongoose.models.Handyman || mongoose.model("Handyman", HandySchema);
export default Handyman;
