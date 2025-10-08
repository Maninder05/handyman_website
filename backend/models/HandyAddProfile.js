import mongoose from "mongoose";

const HandyProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String },
    bio: { type: String, required: true },
    
    // Services is an array of objects with title and description
    services: { 
      type: [
        {
          title: String,
          desc: String,
        },
      ], 
      default: [] 
    },
    
    // Skills 
    skills: { type: [String], default: [] },
    
    // Profile image stored as base64 string or URL
    profileImage: { type: String },
    
    // Stats for the handyman dashboard
    jobsDone: { type: Number, default: 0 },
    inProgress: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    activeOrders: { type: Number, default: 0 },
    
    // Recent orders is an array of objects
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

const HandyProfile = mongoose.models.HandyProfile || mongoose.model("HandyProfile", HandyProfileSchema);

export default HandyProfile;