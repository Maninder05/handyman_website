// routes/routeHandyFilter.js
import express from "express";
import jwt from "jsonwebtoken";
import {
  registerHandyman,
  loginHandyman,
  getHandymanProfile,
  upsertHandymanFilter,
} from "../controllers/ControllerHandyFilter.js";

const router = express.Router();

/* ================================
   🔓 PUBLIC ROUTES
   These don't require authentication
================================ */
router.post("/register", registerHandyman);
router.post("/login", loginHandyman);

/* ================================
   🔐 AUTH MIDDLEWARE
   Protects private routes
================================ */
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Missing token." });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined in .env");
      return res.status(500).json({ error: "Server configuration error." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.handymanId = decoded.id;
    next();
  } catch (err) {
    console.error("❌ Auth Middleware Error:", err.message);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

/* ================================
   🔒 PROTECTED ROUTES
   Require valid JWT token
================================ */
router.get("/me", auth, getHandymanProfile);
router.put("/me", auth, upsertHandymanFilter);

export default router;
