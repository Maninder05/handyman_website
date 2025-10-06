import mongoose from "mongoose";

const HandyProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String },
    bio: { type: String, required: true },
    // FIXED: Changed from [String] to [{ title: String, desc: String }]
    // to match what the dashboard expects
    services: { 
      type: [
        {
          title: String,
          desc: String,
        },
      ], 
      default: [] 
    },
    skills: { type: [String], default: [] },
    profileImage: { type: String },
    jobsDone: { type: Number, default: 0 },
    inProgress: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    activeOrders: { type: Number, default: 0 },
    recentOrders: {
      type: [
        {
          title: String,
          desc: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const HandyProfile =
  mongoose.models.HandyProfile || mongoose.model("HandyProfile", HandyProfileSchema);

export default HandyProfile;