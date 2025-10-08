// for client-to-handyman job payments
import express from "express";
import { handleClientStripeWebhook } from "../controllers/clientWebhook.controller.js";

const router = express.Router();

// Stripe requires raw body to verify the signature
router.post(
  "/",
  express.raw({ type: "application/json" }),
  (req, _res, next) => {
    req.rawBody = req.body; // ✅ this line is required for verifyStripeEvent()
    next();
  },
  handleClientStripeWebhook
);

export default router;
