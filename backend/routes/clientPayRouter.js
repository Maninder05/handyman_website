// backend/routes/clientPayRouter.js
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/client-pay/create-intent
router.post("/create-intent", async (req, res) => {
  try {
    const { bookingID } = req.body;
    if (!bookingID) return res.status(400).json({ error: "bookingID is required" });

    // TODO: look up bookingID in DB for real amount; hardcode for now
    const amountCents = 12000; // $120.00
    const currency = "cad";

    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: { bookingID },
    });

    return res.status(200).json({
      clientSecret: pi.client_secret,
      amountCents,
      currency,
    });
  } catch (err) {
    console.error("Error creating client PI:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
