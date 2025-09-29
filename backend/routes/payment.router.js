import express from "express";
import { createIntent, getPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-intent", createIntent);
router.get("/:id", getPayment);

export default router; // <-- ES module default export
