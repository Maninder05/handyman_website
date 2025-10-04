import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    priceType: { type: String, enum: ["Hourly", "Fixed"], required: true },
    price: { type: Number, required: true },
    image: { type: String }, // store path like /uploads/filename.jpg
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
