//for membership subscriptions

import express from "express";
import { handleStripeWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

// This route handles POST /api/webhooks/stripe
router.post("/", handleStripeWebhook);

export default router; // <-- default export required by your import
