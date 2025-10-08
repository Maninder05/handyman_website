// backend/controllers/webhook.controller.js
import { verifyStripeEvent, stripe } from "../services/stripe.client.js";
import Subscription from "../models/subscription.model.js";

const toDate = (unix) => (unix ? new Date(unix * 1000) : undefined);

const upsert = async (sub, meta = {}) => {
  // sub is a Stripe Subscription object
  await Subscription.findOneAndUpdate(
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
};

export async function handleStripeWebhook(req, res) {
  let event;
  try {
    event = verifyStripeEvent(req);
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.mode === "subscription" && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription);
          await upsert(sub, session.metadata || {});
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        if (invoice.subscription) {
          const sub = await stripe.subscriptions.retrieve(invoice.subscription);
          await upsert(sub); // metadata not needed here; we keep existing plan/billing
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object; // already a subscription object
        await upsert(sub);
        break;
      }
      // other events are ignored
    }

    res.json({ received: true });
  } catch (err) {
    console.error("[webhook] handler error:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}
