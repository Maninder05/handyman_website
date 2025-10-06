import express from "express";
import { signup, login } from "../controllers/ControllerUser.js";
import { body } from "express-validator";
import validate from "../middleware/validate.js";

const router = express.Router();

// Signup validation rules
router.post(
  "/signup",
  [
    body("username")
      .notEmpty().withMessage("Username is required")
      .isLength({ min: 3 }).withMessage("Username must be at least 3 chars"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    body("userType")
      .notEmpty().withMessage("User type is required")
      .isIn(["customer", "handyman"]).withMessage("User type must be customer or handyman"),
  ],
  validate,
  signup
);

// Login validation rules
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email required").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  validate,
  login
);

export default router;