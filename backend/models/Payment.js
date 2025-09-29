import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
  {
    bookingID: { type: String, required: true },
    amount: { type: Number, required: true }, // cents
    currency: { type: String, default: "cad" },
    status: {
      type: String,
      enum: ["created", "processing", "succeeded"],
      default: "created",
    },
    stripePaymentIntentId: { type: String, index: true },
    stripeChargeId: { type: String },
  },
  { timestamps: true }
);

export default model("payment", PaymentSchema);
