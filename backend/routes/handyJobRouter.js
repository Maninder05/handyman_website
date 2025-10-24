// backend/routes/handyJobRouter.js
import { Router } from "express";
import handyJobOffer from "../models/handyJobOffer.js";

const router = Router();

/**
 * Create/send a job offer (client -> handyman)
 * POST /api/handy-jobs
 * Body: { clientId, handymanId, title?, note?, amountCents, currency? }
 */
router.post("/", async (req, res) => {
  try {
    const { clientId, handymanId, title, note, currency = "cad" } = req.body || {};

    if (!clientId || !handymanId) {
      return res.status(400).json({ ok: false, error: "clientId and handymanId are required" });
    }

    // accept amount in cents or (fallback) amount in dollars
    let amountCents =
      req.body.amountCents !== undefined
        ? Number(req.body.amountCents)
        : req.body.amount !== undefined
        ? Math.round(Number(req.body.amount) * 100)
        : NaN;

    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      return res.status(400).json({ ok: false, error: "amountCents must be a positive integer (cents)" });
    }

    const offer = await handyJobOffer.create({
      clientId,
      handymanId,
      title,
      note,
      amountCents,
      currency,
      status: "pending",
      paymentStatus: "none",
    });

    return res.json({ ok: true, offer });
  } catch (e) {
    console.error("create offer error:", e);
    return res.status(500).json({ ok: false, error: "Failed to create offer" });
  }
});

/**
 * Handyman accepts the offer (do NOT touch amountCents)
 * POST /api/handy-jobs/:id/accept
 */
router.post("/:id/accept", async (req, res) => {
  try {
    const offer = await handyJobOffer.findById(req.params.id);
    if (!offer) return res.status(404).json({ ok: false, error: "Offer not found" });

    offer.status = "accepted";
    await offer.save();

    // If you later add booking creation, return it here as { ok:true, offer, bookingID }
    return res.json({ ok: true, offer });
  } catch (e) {
    console.error("accept error:", e);
    return res.status(500).json({ ok: false, error: "Failed to accept" });
  }
});

/**
 * Get one offer
 * GET /api/handy-jobs/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const offer = await handyJobOffer.findById(req.params.id);
    if (!offer) return res.status(404).json({ ok: false, error: "Offer not found" });
    return res.json({ ok: true, offer });
  } catch (e) {
    console.error("get offer error:", e);
    return res.status(500).json({ ok: false, error: "Failed to fetch offer" });
  }
});

export default router;
