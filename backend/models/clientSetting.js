import mongoose from 'mongoose';

const ClientSettingSchema = new mongoose.Schema(
  {
    // User identification
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    
    userType: {
      type: String,
      enum: ['client', 'handyman', 'admin'],
      default: 'client'
    },
    
    // Display settings
    displayTheme: {
      type: String,
      default: 'light',
      enum: ['light', 'dark']
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
    
    // Notification settings
    notificationsEnabled: {
      type: Boolean,
      default: true
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

// Index for faster lookups
ClientSettingSchema.index({ email: 1 });
ClientSettingSchema.index({ userId: 1 });

// Make email lowercase before saving
ClientSettingSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const ClientSetting = mongoose.models.ClientSetting || mongoose.model('ClientSetting', ClientSettingSchema);

export default ClientSetting;