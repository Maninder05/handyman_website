// backend/routes/paypal.routes.js
import express from "express";
import Subscription from "../models/subscription.model.js";
import { getPaypalSubscription } from "../services/paypal.client.js";

const router = express.Router();

router.get("/health", (_req, res) => res.json({ ok: true }));

/**
 * Confirm a PayPal subscription and save into "subscriptions"
 * POST /api/paypal/confirm-subscription
 * body: { subscriptionId, planName, billing, bookingId, userId? }
 */
router.post("/confirm-subscription", async (req, res, next) => {
  try {
    const { subscriptionId, planName, billing, bookingId, userId } = req.body;
    if (!subscriptionId) return res.status(400).json({ error: "subscriptionId required" });

    const sub = await getPaypalSubscription(subscriptionId);

    const saved = await Subscription.findOneAndUpdate(
      { paypalSubscriptionId: sub.id },
      {
        provider: "paypal",
        planName: planName ?? undefined,
        billingInterval: billing ?? undefined,
        bookingId: bookingId ?? undefined,
        userId: userId ?? undefined,

        paypalSubscriptionId: sub.id,
        paypalPlanId: sub.plan_id,
        status: sub.status, // APPROVAL_PENDING, ACTIVE, etc.
        payerId: sub.subscriber?.payer_id,
        payerEmail: sub.subscriber?.email_address,

        currentPeriodStart: sub.start_time ? new Date(sub.start_time) : undefined,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    res.json({ ok: true, provider: "paypal", subscriptionId: sub.id, status: sub.status, mongoId: saved?._id });
  } catch (err) {
    next(err);
  }
});

// (optional) debug during testing
router.get("/debug/all", async (_req, res) => {
  const docs = await Subscription.find({ provider: "paypal" }).sort({ createdAt: -1 }).lean();
  res.json({ count: docs.length, docs });
});

export default router;
