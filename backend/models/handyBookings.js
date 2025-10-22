// handyBookings.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingID: { type: String, index: true },                // optional human id
  customerId: { type: String, required: true },
  proId: { type: String, required: true },
  proStripeAccountId: { type: String, required: true },    // acct_...
  title: String,
  description: String,
  scheduledAt: Date,

  // money (in cents)
  subtotalAmount: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  platformFeeAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true }, // subtotal + tax

  currency: { type: String, default: "cad" },

  // stripe
  stripeCustomerId: String,
  paymentIntentId: String,
  clientSecret: String,

  // lifecycle
  status: {
    type: String,
    enum: [
      "await_approval",
      "accepted",
      "authorized",           // hold placed
      "in_progress",
      "done_by_handyman",
      "await_client_confirm",
      "captured",             // charge finalized
      "paid_out",
      "completed",
      "declined",
      "canceled",
      "authorization_expired"
    ],
    default: "await_approval"
  },
  expiresAt: Date,           // 24h accept window
  transferId: String         // (if you use transfers path)
}, { timestamps: true });

export default mongoose.model("HandyBooking", bookingSchema);
