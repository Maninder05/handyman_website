import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  handymanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Handyman",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  serviceType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
reviewSchema.index({ handymanId: 1, createdAt: -1 });
reviewSchema.index({ clientId: 1, createdAt: -1 });
reviewSchema.index({ jobId: 1 }, { unique: true }); // One review per job

const Review = mongoose.model("Review", reviewSchema);
export default Review;
