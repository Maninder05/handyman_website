import express from "express";
import { handleStripeWebhook } from "../controllers/webhook.controller.js";
// or if you renamed: import { handleHandyStripeWebhook as handleStripeWebhook } from "../controllers/handyStripeController.js";

const router = express.Router();

// This handles POST /api/webhooks/stripe
// IMPORTANT: index.js must mount this with express.raw({ type: "application/json" }) BEFORE express.json()
router.post("/", handleStripeWebhook);

export default router;
