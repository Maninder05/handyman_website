import mongoose from "mongoose";

const handyBookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Types.ObjectId, required: true },
    proId: { type: mongoose.Types.ObjectId, required: true },
    proStripeAccountId: { type: String, required: true },

    title: String,
    description: String,
    scheduledAt: Date,

    subtotalAmount: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    platformFeeAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    stripeCustomerId: String,
    paymentIntentId: String,
    clientSecret: String,
    chargeSucceededAt: Date,
    transferId: String,

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "COMPLETED", "PAID_OUT"],
      default: "PENDING"
    }
  },
  { timestamps: true, collection: "handyBookings" }
);

const HandyBooking = mongoose.model("HandyBooking", handyBookingSchema);
export default HandyBooking;
