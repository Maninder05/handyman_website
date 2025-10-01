// routes/handyRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import {
  registerHandyman,
  loginHandyman,
  getHandymanProfile,
  upsertHandymanFilter,
} from "../controllers/controllerHandyFilter.js";

const router = express.Router();

// Public
router.post("/register", registerHandyman);
router.post("/login", loginHandyman);

// simple auth middleware
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith?.("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.handymanId = decoded.id;
    next();
  } catch (err) {
    console.error("auth middleware error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Protected routes - operate on the authenticated handyman
router.get("/me", auth, getHandymanProfile);
router.put("/me", auth, upsertHandymanFilter); // update profile / filters

export default router;
