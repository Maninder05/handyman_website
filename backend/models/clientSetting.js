import mongoose from 'mongoose';

const ClientSettingSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    theme: {
      type: String,
      default: 'light',
      enum: ['light', 'dark', 'auto']
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de']
    },
    timezone: {
      type: String,
      default: 'UTC',
      enum: ['UTC', 'EST', 'CST', 'MST', 'PST']
    },
    privacySettings: {
      profileVisibility: {
        type: String,
        default: 'public',
        enum: ['public', 'private', 'contacts']
      },
      showEmail: {
        type: Boolean,
        default: true
      },
      showPhone: {
        type: Boolean,
        default: false
      }
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      smsNotifications: {
        type: Boolean,
        default: false
      },
      pushNotifications: {
        type: Boolean,
        default: true
      },
      jobAlerts: {
        type: Boolean,
        default: true
      },
      messageAlerts: {
        type: Boolean,
        default: true
      }
    }
  },
  { 
    timestamps: true,
    collection: 'clientsettings'
  }
);

// Add index for faster lookups
ClientSettingSchema.index({ email: 1 });

// Pre-save hook to ensure email is lowercase
ClientSettingSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const ClientSetting = mongoose.models.ClientSetting || mongoose.model('ClientSetting', ClientSettingSchema);

export default ClientSetting;