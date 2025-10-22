import express from "express";
import { handleClientStripeWebhook } from "../controllers/clientWebhook.controller.js";

const router = express.Router();

// Stripe will POST here; req.body is a Buffer because index.js mounted express.raw()
router.post("/", handleClientStripeWebhook);

export default router;
