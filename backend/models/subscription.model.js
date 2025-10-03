// backend/models/subscription.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SubscriptionSchema = new Schema(
  {
    // common app fields
    userId: { type: Schema.Types.ObjectId, ref: "user", index: true },
    provider: { type: String, enum: ["stripe", "paypal"], default: "stripe", index: true },
    planName: { type: String },
    billingInterval: { type: String, enum: ["monthly", "yearly"] },
    bookingId: { type: String, index: true },
    status: { type: String },

    // Stripe-only fields
    stripeCustomerId: { type: String, index: true },
    stripeSubscriptionId: { type: String },

    // PayPal-only fields
    paypalSubscriptionId: { type: String },
    paypalPlanId: { type: String },
    payerId: { type: String },
    payerEmail: { type: String },

    // period
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
  },
  { timestamps: true }
);

// unique per provider id (sparse so the other provider can be null)
SubscriptionSchema.index({ stripeSubscriptionId: 1 }, { unique: true, sparse: true });
SubscriptionSchema.index({ paypalSubscriptionId: 1 }, { unique: true, sparse: true });

export default model("Subscription", SubscriptionSchema);
