import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
      // Job title like "Electrical Repair", "Plumbing Fix"
    },
    description: {
      type: String,
      required: true
      // Detailed description of what needs to be done
    },
    category: {
      type: String,
      required: true
      // Category like "Electrical", "Plumbing", "Carpentry"
    },
    clientEmail: {
      type: String,
      required: true
      // Email of customer who posted this job
    },
    clientName: {
      type: String,
      required: true
      // Name of the customer
    },
    handymanEmail: {
      type: String,
      default: null
      // Null until a handyman accepts the job
    },
    handymanName: {
      type: String,
      default: null
      // Name gets filled when handyman accepts
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'completed', 'cancelled'],
      default: 'open'
      // open = no one accepted yet
      // in_progress = handyman working on it
      // completed = job finished
      // cancelled = job was cancelled
    },
    pricePerHour: {
      type: Number,
      required: true
      // How much per hour for this job
    },
    hoursWorked: {
      type: Number,
      default: 0
      // Handyman enters this when completing the job
    },
    totalPayment: {
      type: Number,
      default: 0
      // Calculated as pricePerHour × hoursWorked
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null
      // Customer rates after job completion (1-5 stars)
    },
    review: {
      type: String,
      default: null
      // Optional written review from customer
    },
    jobImage: {
      type: String,
      default: null
      // Optional image of the job site
    },
    completedAt: {
      type: Date,
      default: null
      // Timestamp when job was completed
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

export default Job;