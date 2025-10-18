import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    profileImage: {
      type: String
    },
    jobsPosted: {
      type: Number,
      default: 0
    },
    activeJobs: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    savedHandymen: {
      type: [String],
      default: []
    },
    recentJobs: {
      type: [
        {
          title: String,
          description: String,
          status: String,
          budget: Number,
          createdAt: Date
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

export default Client;