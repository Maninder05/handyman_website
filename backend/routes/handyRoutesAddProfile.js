import express from "express";
import { createHandyman, getHandymen } from "../controllers/handyControllerAddprofile.js";

const router = express.Router();

// Create a handyman profile
router.post("/", createHandyman);

// Get all handyman profiles
router.get("/", getHandymen);

export default router;
