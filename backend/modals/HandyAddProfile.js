import mongoose from 'mongoose';

const handymanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  bio: { type: String, required: true },
  services: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  profileImage: { type: String },
}, { timestamps: true });

const Handyman = mongoose.model('Handyman', handymanSchema);
export default Handyman;
