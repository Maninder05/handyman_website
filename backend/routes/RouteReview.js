import express from "express";
import multer from "multer";
import Review from "../models/ReviewModel.js";
import Notification from "../models/NotificationModel.js";
import auth from "../middleware/auth.js";

// express.Router() helps create a small route handler so we can keep our Express project clean and modular.
const router = express.Router();

// Multer setup → handles image/file uploads.
//  diskStorage() → tells Multer to save files on your computer (not in memory).
//  destination → a function that decides *where* to save the file.
//    (_, __, cb) → means we don’t need the first two parameters (req, file).
//    cb(null, "uploads/reviews/") → saves files inside this folder.
//  filename → a function that decides *what name* the file should have.
//    Date.now() → adds current time so every file name is unique.
//    file.originalname.replace(/\s+/g, "_") → replaces spaces with underscores.
// cb → a callback function used to tell Multer what to do next
//  multer({ storage }) → creates the upload tool using the rules above.
// (/\s+/g, "_") This is the regex pattern — it finds one or more spaces in the text (\s means “space,” and + means “one or more”).
// g This means global, so it replaces all spaces in the file name, not just the first one.
// + "-" + used to join text together — it’s called string concatenation.( readable and unquie)
// useeffect = react hook is used to generate side effects to a component
// usestate = react hook is used to update state component without refreshing the page
// useroute = react hook is used to navigation and routing
// ... spread operator is used for D structuring of an object ti get the key value pairs of an arry
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/reviews/"),
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// POST Review
//async (req, res) => { ... } is a function that handles one web request and can wait for async tasks like saving data to the database.
//router.post("/", ...) → Handles POST requests to /api/reviews.
//auth → checks the user’s token (must be logged in).
//upload.array("images", 5) → allows up to 5 image uploads.
//!== means “strictly not equal.”
//It checks both value and type are different.

router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    if (req.user.userType !== "client")
      return res.status(403).json({ message: "Only clients can post reviews" });

    //“If a review with this jobId exists, immediately stop and send an error message in JSON.”
    const { handymanId, jobId, rating, comment, serviceType } = req.body;
    if (await Review.findOne({ jobId }))
      return res
        .status(400)
        .json({ message: "Review already exists for this job" });
    //map() is used to read the index in a arrry and retruna all the elelments of an arry
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
      //$ inside ${...} means “insert this variable or expression into the string.”
      message: `You received a ${rating}-star review.`,
      relatedId: review._id,
    });
    //A try block is used to wrap code that might cause an error.
    //If something goes wrong (an error happens), it jumps to the catch block` to handle it safely instead of crashing the program.
    res.json({ message: "Review posted successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== GET Handyman Reviews =====
router.get("/handyman/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //Review.find({ handymanId: id }) → fetch all reviews for that handyman.
    //populate("clientId", "name profilePic") → replace clientId with actual client info (name and profile picture).
    //sort({ createdAt: -1 }) → sort reviews newest first.
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

// References:
// - Express.js routing: https://expressjs.com/en/guide/routing.html
// - Mongoose models and schemas: https://mongoosejs.com/docs/guide.html
// - Multer for file uploads: https://www.npmjs.com/package/multer
// - React Hooks (useState, useEffect): https://react.dev/learn/state-a-components-memory
// - JavaScript array methods (map, reduce): https://developer.mozilla.org/
