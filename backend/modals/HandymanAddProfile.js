import mongoose from 'mongoose';

const HandymanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  services: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  profileImage: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Handyman', HandymanSchema);
