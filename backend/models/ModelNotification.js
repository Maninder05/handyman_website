// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User' }, // optional
  title: { type: String, required: true },
  body: { type: String },
  data: { type: Schema.Types.Mixed }, // to store action ids e.g. { orderId: '...' }
  read: { type: Boolean, default: false },
  channel: { type: String, enum: ['system','order','payment','review'], default: 'system' }
}, { timestamps: true });

NotificationSchema.index({ recipient: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);
