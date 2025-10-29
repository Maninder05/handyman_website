import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import Review from "../models/ReviewModel.js";
import Notification from "../models/NotificationModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/reviews/"),
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// ===== POST Review =====
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    if (req.user.userType !== "client")
      return res.status(403).json({ message: "Only clients can post reviews" });

    const { handymanId, jobId, rating, comment, serviceType } = req.body;
    if (await Review.findOne({ jobId }))
      return res
        .status(400)
        .json({ message: "Review already exists for this job" });

    const review = await Review.create({
      handymanId,
      clientId: req.user.id,
      jobId,
      rating,
      comment,
      serviceType,
      images: req.files.map((f) => f.filename),
    });

    await Notification.create({
      userId: handymanId,
      userType: "handyman",
      type: "review_received",
      title: "New Review",
      message: `You received a ${rating}-star review.`,
      relatedId: review._id,
    });

    res.json({ message: "Review posted successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== GET Handyman Reviews =====
router.get("/handyman/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ handymanId: id })
      .populate("clientId", "name profilePic")
      .sort({ createdAt: -1 });

    const avg = reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

    res.json({ reviews, averageRating: avg, totalReviews: reviews.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
