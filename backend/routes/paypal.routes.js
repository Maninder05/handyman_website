// backend/routes/paypal.routes.js
import express from "express";
import Subscription from "../models/subscription.model.js";
import { getPaypalSubscription } from "../services/paypal.client.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    env: process.env.PAYPAL_ENV || "sandbox",
    hasClientId: !!process.env.PAYPAL_CLIENT_ID,
    hasSecret: !!process.env.PAYPAL_CLIENT_SECRET,
  });
});

/**
 * Confirm a PayPal subscription and save into "subscriptions"
 * body: { subscriptionId, planName, billing, bookingId, userId? }
 */
router.post("/confirm-subscription", async (req, res) => {
  try {
    const { subscriptionId, planName, billing, bookingId, userId } = req.body || {};
    if (!subscriptionId) return res.status(400).json({ error: "subscriptionId required" });

    console.log("[paypal] confirm body:", req.body);

    // Verify with PayPal
    const sub = await getPaypalSubscription(subscriptionId);
    console.log("[paypal] fetched:", {
      id: sub?.id,
      status: sub?.status,
      plan_id: sub?.plan_id,
      email: sub?.subscriber?.email_address,
    });

    // Upsert in shared subscriptions collection
    const doc = await Subscription.findOneAndUpdate(
      { paypalSubscriptionId: sub.id },
      {
        provider: "paypal",
        planName: planName ?? undefined,
        billingInterval: billing ?? undefined,
        bookingId: bookingId ?? undefined,
        userId: userId ?? undefined,

        paypalSubscriptionId: sub.id,
        paypalPlanId: sub.plan_id,
        status: sub.status,
        payerId: sub.subscriber?.payer_id,
        payerEmail: sub.subscriber?.email_address,
        currentPeriodStart: sub.start_time ? new Date(sub.start_time) : undefined,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("[paypal] upserted mongo:", doc?._id?.toString());
    res.json({ ok: true, provider: "paypal", subscriptionId: sub.id, status: sub.status, mongoId: doc?._id });
  } catch (err) {
    console.error("[paypal] confirm error:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

// Debug helper
router.get("/debug/all", async (_req, res) => {
  const docs = await Subscription.find({ provider: "paypal" }).sort({ createdAt: -1 }).lean();
  res.json({ count: docs.length, docs });
});

export default router;
