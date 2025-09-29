import Payment from "../models/Payment.js";
import { constructEvent } from "../services/stripe.service.js";

// POST /api/webhooks/stripe  (raw body is set in index.js before json middleware)
export async function handleStripeWebhook(req, res, next) {
  try {
    const sig = req.headers["stripe-signature"];
    const event = constructEvent(sig, req.rawBody);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const intent = event.data.object;
        const chargeId = intent.charges?.data?.[0]?.id;
        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: intent.id },
          { status: "succeeded", ...(chargeId ? { stripeChargeId: chargeId } : {}) }
        );
        break;
      }
      case "payment_intent.processing": {
        const intent = event.data.object;
        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: intent.id },
          { status: "processing" }
        );
        break;
      }
      default:
        // ignore others
        break;
    }

    res.json({ received: true });
  } catch (err) {
    next(err);
  }
}
