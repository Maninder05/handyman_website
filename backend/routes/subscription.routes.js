// backend/routes/subscription.routes.js
import express from "express";
import { stripe } from "../services/stripe.client.js";
import Subscription from "../models/subscription.model.js";

const router = express.Router();

/** Price IDs from .env (must be price_...) */
const PRICE_IDS = {
  Basic:    { monthly: process.env.PRICE_BASIC_MONTHLY,    yearly: process.env.PRICE_BASIC_YEARLY },
  Seasonal: { monthly: process.env.PRICE_SEASONAL_MONTHLY, yearly: process.env.PRICE_SEASONAL_YEARLY },
  Pro:      { monthly: process.env.PRICE_PRO_MONTHLY,      yearly: process.env.PRICE_PRO_YEARLY },
};

const toDate = (unix) => (unix ? new Date(unix * 1000) : undefined);

async function upsert(sub, meta = {}) {
  return await Subscription.findOneAndUpdate(
    { stripeSubscriptionId: sub.id },
    {
      planName: meta.planName ?? undefined,
      billingInterval: meta.billing ?? undefined,
      stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
      stripeSubscriptionId: sub.id,
      status: sub.status,
      currentPeriodStart: toDate(sub.current_period_start),
      currentPeriodEnd: toDate(sub.current_period_end),
      bookingId: meta.bookingId ?? undefined,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

/** Health + debug */
router.get("/health", (_req, res) => res.json({ ok: true }));
router.get("/debug/all", async (_req, res) => {
  const docs = await Subscription.find().sort({ createdAt: -1 }).lean();
  res.json({ count: docs.length, docs });
});

/** Create Checkout Session (hosted) */
router.post("/checkout-session", async (req, res, next) => {
  try {
    const { planName = "Basic", billing = "monthly", bookingId, email } = req.body;

    const priceId = PRICE_IDS?.[planName]?.[billing];
    if (!priceId) return res.status(400).json({ error: "Missing PRICE_* env for that plan/billing" });
    if (!priceId.startsWith("price_")) {
      return res.status(400).json({ error: `PRICE ID must start with "price_". Got "${priceId}".` });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      // include session_id so we can confirm later
      success_url: `${process.env.CLIENT_URL}/pay?success=1&session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(
        planName
      )}&billing=${billing}`,
      cancel_url: `${process.env.CLIENT_URL}/pay?canceled=1&plan=${encodeURIComponent(
        planName
      )}&billing=${billing}`,
      metadata: { planName, billing, bookingId: bookingId || "" },
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

/** Internal helper */
async function confirmBySessionId(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });

  let sub =
    session.subscription && typeof session.subscription !== "string"
      ? session.subscription
      : null;

  if (!sub) {
    const subId =
      typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
    if (!subId) throw new Error("No subscription on session");
    sub = await stripe.subscriptions.retrieve(subId);
  }

  const saved = await upsert(sub, session.metadata || {});
  return { saved, sub, session };
}

/** POST confirm (frontend calls this automatically) */
router.post("/confirm", async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "sessionId required" });

    const { saved, sub } = await confirmBySessionId(sessionId);
    res.json({ ok: true, sessionId, subscriptionId: sub.id, status: sub.status, mongoId: saved?._id });
  } catch (err) {
    next(err);
  }
});

/** GET confirm (so you can hit it in the browser manually) */
router.get("/confirm", async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId) return res.status(400).json({ error: "session_id query required" });

    const { saved, sub } = await confirmBySessionId(sessionId);
    res.json({ ok: true, sessionId, subscriptionId: sub.id, status: sub.status, mongoId: saved?._id });
  } catch (err) {
    next(err);
  }
});

export default router;
