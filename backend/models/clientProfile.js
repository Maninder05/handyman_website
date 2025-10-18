import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    profileImage: {
      type: String
    },
    jobsPosted: {
      type: Number,
      default: 0
    },
    activeJobs: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    savedHandymen: {
      type: [String],
      default: []
    },
    recentJobs: {
      type: [
        {
          title: String,
          description: String,
          status: String,
          budget: Number,
          createdAt: Date
        }
      ],
      default: []
    },
    
    // FIELDS FOR SETTINGS:
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    password: {
      type: String
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
    
    notificationSettings: {
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
    },
    
    displaySettings: {
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
      }
    }
  },
  { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

export default Client;