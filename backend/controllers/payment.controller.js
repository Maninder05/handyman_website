/**Author: Navindu 
 * 
*/
import Payment from "../models/Payment.js";
import { createPaymentIntent } from "../services/stripe.service.js";

const toCents = (n) => Math.round(Number(n) * 100);

// POST /api/payments/create-intent  { bookingID, amount, currency? }
export async function createIntent(req, res, next) {
  try {
    const { bookingID, amount, currency } = req.body;
    if (!bookingID || !amount) {
      return res.status(400).json({ error: "bookingID and amount are required" });
    }

    const cents = toCents(amount);
    const curr = (currency || process.env.DEFAULT_CURRENCY || "cad").toLowerCase();

    const intent = await createPaymentIntent({
      amount: cents,
      currency: curr,
      metadata: { bookingID },
    });

    const payment = await Payment.create({
      bookingID,
      amount: cents,
      currency: curr,
      status: "created",
      stripePaymentIntentId: intent.id,
    });

    res.status(201).json({
      paymentId: payment._id,
      clientSecret: intent.client_secret,
      status: payment.status,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/payments/:id
export async function getPayment(req, res, next) {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (err) {
    next(err);
  }
}
