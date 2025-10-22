
import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    jobsPosted: { type: Number, default: 0 },
    activeJobs: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    savedHandymen: { type: [String], default: [] },
    recentJobs: [
      {
        title: String,
        description: String,
        status: String,
        budget: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
