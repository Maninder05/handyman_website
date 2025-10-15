// backend/routes/CreateServiceRoutes.js
import express from "express";
import multer from "multer";
import {
  createService,
  getServices,
  getDrafts,
  updateService,
  deleteService,
} from "../controllers/CreateServiceController.js";

const router = express.Router();

// Multer setup (same as before)
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

// Drafts route
router.get("/drafts", getDrafts);

// Update (supports optional image upload)
router.put("/:id", upload.single("image"), updateService);

// Delete
router.delete("/:id", deleteService);

export default router;
