import express from "express";
import multer from "multer";
import { createService, getServices } from "../controllers/CreateServiceController.js";

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createService);
router.get("/", getServices);

export default router;
