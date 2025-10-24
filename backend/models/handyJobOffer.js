// backend/models/handyJobOffer.js
import mongoose from "mongoose";

const handyJobOfferSchema = new mongoose.Schema(
  {
    clientId:   { type: String, required: true },
    handymanId: { type: String, required: true },
    title:      { type: String, default: "" },
    note:       { type: String, default: "" },
    status:     { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },

    // IMPORTANT: required (no default 0) so we actually persist the real value
    amountCents:{ type: Number, required: true },     // e.g. 2000 => $20.00
    currency:   { type: String, default: "cad" },

    // simple payment state placeholder (not used by these endpoints, but harmless)
    paymentStatus: { type: String, enum: ["none","awaiting_authorization","authorized","succeeded","canceled"], default: "none" },
  },
  { timestamps: true }
);

export default mongoose.models.handyJobOffer
  || mongoose.model("handyJobOffer", handyJobOfferSchema);
