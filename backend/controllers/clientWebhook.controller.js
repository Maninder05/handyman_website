// backend/controllers/clientWebhook.controller.js
import { stripe, verifyStripeEvent } from "../services/stripe.client.js";
import HandyBooking from "../models/handyBookings.js";

// ✅ Named export (matches your import)
export const handleClientStripeWebhook = async (req, res) => {
  let event;
  try {
    // ✅ Use your existing helper to verify the event signature
    event = verifyStripeEvent(req);
  } catch (err) {
    console.error("[Stripe Client Webhook] Invalid signature:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object;

      // ✅ Find the booking by paymentIntentId
      const booking = await HandyBooking.findOne({ paymentIntentId: pi.id });

      if (booking && !booking.chargeSucceededAt) {
        await HandyBooking.findByIdAndUpdate(booking._id, {
          chargeSucceededAt: new Date(),
          status: "COMPLETED",
        });

        console.log(`✅ Booking ${booking._id} marked as COMPLETED`);
      }
    }

    // ✅ Respond to Stripe that we received the event
    res.json({ received: true });
  } catch (error) {
    console.error("[Stripe Client Webhook] Handler error:", error);
    res.status(500).json({ error: "Webhook handler error" });
  }
};
