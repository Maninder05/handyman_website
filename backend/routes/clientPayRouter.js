// backend/routes/clientPayRouter.js
import { Router } from "express";
import Stripe from "stripe";
import handyJobOffer from "../models/handyJobOffer.js";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a manual-capture PaymentIntent for an offer.
 * Client will confirm in the Payment Element to place an AUTH HOLD.
 *
 * POST /api/client-pay/create-intent
 * Body: { offerId? | bookingID? }
 * Returns: { ok, clientSecret, piId, offerId }
 */
router.post("/create-intent", async (req, res) => {
  try {
    const offerId = req.body.offerId || req.body.bookingID;
    if (!offerId) return res.status(400).json({ ok: false, error: "offerId (or bookingID) is required" });

    const offer = await handyJobOffer.findById(offerId);
    if (!offer) return res.status(404).json({ ok: false, error: "Offer not found" });

    // (Optional) require acceptance first
    // if (offer.status !== "accepted") return res.status(400).json({ ok:false, error:"Offer must be accepted first" });

    const pi = await stripe.paymentIntents.create({
      amount: offer.amountCents,
      currency: (offer.currency || "cad").toLowerCase(),
      capture_method: "manual", // <-- MANUAL CAPTURE (AUTH HOLD)
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
      metadata: {
        offerId: offer._id.toString(),
        clientId: offer.clientId,
        handymanId: offer.handymanId,
      },
    });

    offer.paymentIntentId = pi.id;
    offer.paymentStatus = "awaiting_authorization"; // will become 'requires_capture' after client confirms
    await offer.save();

    return res.json({ ok: true, clientSecret: pi.client_secret, piId: pi.id, offerId: offer._id });
  } catch (e) {
    console.error("create-intent error:", e);
    return res.status(500).json({ ok: false, error: e.message || "Failed to create PaymentIntent" });
  }
});

/**
 * Capture funds after job completion.
 *
 * POST /api/client-pay/capture
 * Body: { offerId, amountCents? }  // optional partial capture (≤ authorized)
 * Returns: { ok, status, piId, capturedAmount }
 */
router.post("/capture", async (req, res) => {
  try {
    const { offerId, amountCents } = req.body || {};
    if (!offerId) return res.status(400).json({ ok: false, error: "offerId is required" });

    const offer = await handyJobOffer.findById(offerId);
    if (!offer) return res.status(404).json({ ok: false, error: "Offer not found" });
    if (!offer.paymentIntentId) return res.status(400).json({ ok: false, error: "No paymentIntentId on offer" });

    // Retrieve current PI to check status & authorized amount
    const pi = await stripe.paymentIntents.retrieve(offer.paymentIntentId);

    if (pi.status !== "requires_capture") {
      return res.status(400).json({ ok: false, error: `PI status is '${pi.status}', not 'requires_capture'` });
    }

    // If amountCents is provided, capture that partial amount (must be ≤ pi.amount)
    // Otherwise capture full authorized amount.
    const params = {};
    if (Number.isFinite(Number(amountCents)) && Number(amountCents) > 0) {
      params.amount_to_capture = Number(amountCents);
    }

    const captured = await stripe.paymentIntents.capture(pi.id, params);

    // Update DB view of payment status
    if (captured.status === "succeeded") {
      offer.paymentStatus = "succeeded";
      await offer.save();
    }

    return res.json({
      ok: true,
      status: captured.status,     // this updates the 
      capturedAmount: captured.amount_received || captured.amount, // in cents
    });
  } catch (e) {
    console.error("capture error:", e);
    return res.status(500).json({ ok: false, error: e.message || "Failed to capture" });
  }
});

/**
 * (Optional) Check live status of the PaymentIntent for an offer.
 * GET /api/client-pay/status?offerId=...
 */
router.get("/status", async (req, res) => {
  try {
    const { offerId } = req.query || {};
    if (!offerId) return res.status(400).json({ ok: false, error: "offerId is required" });

    const offer = await handyJobOffer.findById(offerId);
    if (!offer || !offer.paymentIntentId) {
      return res.status(404).json({ ok: false, error: "No PaymentIntent for this offer" });
    }

    const pi = await stripe.paymentIntents.retrieve(offer.paymentIntentId);
    // Optionally sync DB flag
    // offer.paymentStatus = pi.status; await offer.save();

    res.json({ ok: true, status: pi.status, piId: pi.id, amount: pi.amount, currency: pi.currency });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
