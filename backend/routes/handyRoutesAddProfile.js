import express from "express";
import {
  createHandyProfile,
  getAllHandyProfiles,
  getHandyProfileById,
  updateHandyProfile,
  deleteHandyProfile,
} from "../controllers/ControllerHandyProfile.js";

const router = express.Router();

router.post("/", createHandyProfile);
router.get("/", getAllHandyProfiles);
router.get("/:id", getHandyProfileById);
router.put("/:id", updateHandyProfile);
router.delete("/:id", deleteHandyProfile);

export default router;
