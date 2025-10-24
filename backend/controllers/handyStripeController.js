import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// optional: keep handlers modular
async function onSubscriptionEvent(event) {
  switch (event.type) {
    case "checkout.session.completed":
      // TODO: mark plan active
      break;
    case "customer.subscription.updated":
    case "customer.subscription.created":
      // TODO: upsert subscription status
      break;
    case "customer.subscription.deleted":
      // TODO: mark canceled
      break;
  }
}

async function onJobPaymentEvent(event, models) {
  const { handyJobOffer } = models; // inject your model
  if (event.type === "payment_intent.amount_capturable_updated") {
    const pi = event.data.object;
    const offerId = pi.metadata?.handyJobOfferId;
    if (offerId) await handyJobOffer.findByIdAndUpdate(offerId, { paymentStatus: "authorized" });
  }
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    const offerId = pi.metadata?.handyJobOfferId;
    if (offerId) await handyJobOffer.findByIdAndUpdate(offerId, { paymentStatus: "succeeded" });
  }
  if (event.type === "payment_intent.canceled") {
    const pi = event.data.object;
    const offerId = pi.metadata?.handyJobOfferId;
    if (offerId) await handyJobOffer.findByIdAndUpdate(offerId, { paymentStatus: "canceled" });
  }
}

export async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,                       // raw buffer (router mounted with express.raw)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook verify failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Fan out based on event family
    if (event.type.startsWith("customer.") || event.type.startsWith("checkout.")) {
      await onSubscriptionEvent(event);
    } else if (event.type.startsWith("payment_intent.")) {
      const handyJobOffer = (await import("../models/handyJobOffer.js")).default;
      await onJobPaymentEvent(event, { handyJobOffer });
    }
    // else: ignore unrelated event types
  } catch (e) {
    console.error("Webhook handler error:", e);
    // still acknowledge to avoid endless retries; keep logs/alerts
  }

  res.json({ received: true });
}