// backend/controllers/clientWebhook.controller.js
import 'dotenv/config';                  // ensure env is loaded in this module too
import Stripe from 'stripe';
import HandyBooking from '../models/handyBookings.js';

// Lazy init so we don't construct Stripe until env is available
let _stripe = null;
function getStripe() {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is missing. Add it to your .env file.');
  }
  _stripe = new Stripe(key);
  return _stripe;
}

/**
 * Webhook for client→handyman payments.
 * IMPORTANT: route must be mounted with express.raw({ type: "application/json" }).
 */
export async function handleClientStripeWebhook(req, res) {
  const stripe = getStripe(); // <-- create/read Stripe here

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw Buffer from express.raw
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_CLIENT
    );
  } catch (err) {
    console.error('[WEBHOOK] Verify failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'payment_intent.amount_capturable_updated') {
      const pi = event.data.object;
      await HandyBooking.findOneAndUpdate(
        { paymentIntentId: pi.id },
        { status: 'authorized' },
        { new: true }
      );
      console.log('[WEBHOOK] AUTHORIZED:', pi.id);
    }

    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object;
      await HandyBooking.findOneAndUpdate(
        { paymentIntentId: pi.id },
        { status: 'paid_out' },
        { new: true }
      );
      console.log('[WEBHOOK] SUCCEEDED:', pi.id);
    }

    if (event.type === 'payment_intent.canceled') {
      const pi = event.data.object;
      await HandyBooking.findOneAndUpdate(
        { paymentIntentId: pi.id },
        { status: 'authorization_expired' },
        { new: true }
      );
      console.log('[WEBHOOK] CANCELED:', pi.id);
    }
  } catch (err) {
    console.error('[WEBHOOK] Handler error:', err);
  }

  res.json({ received: true });
}
