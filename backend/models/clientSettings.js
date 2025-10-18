import mongoose from 'mongoose';

const ClientSettingsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    privacySettings: {
      profileVisibility: { type: String, default: 'public' },
      showEmail: { type: Boolean, default: true },
      showPhone: { type: Boolean, default: false }
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    notificationSettings: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
      pushNotifications: { type: Boolean, default: true },
      jobAlerts: { type: Boolean, default: true },
      messageAlerts: { type: Boolean, default: true }
    },
    displaySettings: {
      theme: { type: String, default: 'light' },
      language: { type: String, default: 'en' },
      timezone: { type: String, default: 'UTC' }
    }
  },
  { timestamps: true }
);

const ClientSettings = mongoose.models.ClientSettings || mongoose.model('ClientSettings', ClientSettingsSchema);

export default ClientSettings;