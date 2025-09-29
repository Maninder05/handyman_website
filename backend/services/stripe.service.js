// services/stripe.service.js
// Load .env explicitly from the backend folder, BEFORE creating Stripe
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Stripe from 'stripe';

// Resolve <backend>/.env no matter where node is launched from
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Debug: show whether the key is visible here
console.log('[stripe.service] STRIPE_SECRET_KEY present?', !!process.env.STRIPE_SECRET_KEY);

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  // Stop early with a clear message instead of letting Stripe throw a vague error
  throw new Error('STRIPE_SECRET_KEY is missing. Ensure <backend>/.env contains it and you are running `node index.js` from the backend folder.');
}

const stripe = new Stripe(apiKey);

export function createPaymentIntent({ amount, currency, metadata }) {
  return stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: metadata || {},
  });
}

export function constructEvent(sigHeader, rawBody) {
  return stripe.webhooks.constructEvent(
    rawBody,
    sigHeader,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}
