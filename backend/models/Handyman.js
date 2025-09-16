{/**Author: Navi */}

import mongoose from "mongoose";

const HandymanSchema = new mongoose.Schema({
    fullName: {type: String, required: true, trim: true},
    services: {type: [String], default: [], set: arr => (Array.isArray(arr) ? arr.map(s => String(s).toLowerCase()) : [])},
    hourlyRate: {type: Number, required: true, min: 0},
    ratingAvg: {type: Number , required: true, min: 0, max: 5},
    verified: {type: Boolean, default: false},
    city: {type: String, required: true, trim: true},
});

export default mongoose.model("Handyman", HandymanSchema);