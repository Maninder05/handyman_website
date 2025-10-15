import express from "express";
import multer from "multer";
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from "../controllers/CreateServiceController.js";

const router = express.Router();

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= ROUTES =================

// ✅ Create a new service
router.post("/", upload.single("image"), createService);

// ✅ Get all services
router.get("/", getServices);

// ✅ Update a service by ID
router.put("/:id", upload.single("image"), updateService);

// ✅ Delete a service by ID
router.delete("/:id", deleteService);

export default router;
