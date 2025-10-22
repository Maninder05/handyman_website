// controllers/notificationController.js
const Notification = require('../models/ModelNotification');
// const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
// const { sendSms } = require('../services/smsService');

const createNotification = async ({ recipientId, senderId, title, body, data = {}, channel = 'system', io = null }) => {
  const notif = await Notification.create({
    recipient: recipientId,
    sender: senderId,
    title,
    body,
    data,
    channel
  });

  // populate minimal info
  const populated = await notif.populate('recipient', 'email phone notificationPreferences').execPopulate();

  // emit realtime event to the user's socket if io provided
  if (io && populated.recipient && populated.recipient.socketId) {
    io.to(populated.recipient.socketId).emit('notification', {
      notification: {
        id: notif._id,
        title,
        body,
        data,
        channel,
        createdAt: notif.createdAt
      }
    });
  }

  // Send email if preference enabled
  try {
    if (populated.recipient.notificationPreferences.email) {
      await sendEmail({
        to: populated.recipient.email,
        subject: title,
        templateName: 'default',
        templateVars: { username: populated.recipient.name || '', title, body, data }
      });
    }
  } catch (err) {
    console.error('Email send error:', err.message);
  }

  // Send SMS if preference enabled and phone exists
  try {
    if (populated.recipient.notificationPreferences.sms && populated.recipient.phone) {
      await sendSms(populated.recipient.phone, `${title} - ${body}`);
    }
  } catch (err) {
    console.error('SMS send error:', err.message);
  }

  return notif;
};

const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // assume auth middleware sets req.user
    const notifs = await Notification.find({ recipient: userId }).sort({ createdAt: -1 }).limit(100);
    const unreadCount = await Notification.countDocuments({ recipient: userId, read: false });
    res.json({ success: true, notifications: notifs, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const updated = await Notification.findOneAndUpdate({ _id: id, recipient: userId }, { read: true }, { new: true });
    const unreadCount = await Notification.countDocuments({ recipient: userId, read: false });
    res.json({ success: true, notification: updated, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const markAllRead = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.updateMany({ recipient: userId, read: false }, { $set: { read: true }});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createNotification, getNotifications, markAsRead, markAllRead };
