import mongoose from 'mongoose';

const HandymanSchema = new mongoose.Schema(
  {
    // User reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Unique handyman identifier
    handymanId: {
      type: String,
      unique: true,
      required: true,
      default: () => `HM${Date.now()}${Math.floor(Math.random() * 1000)}`
    },

    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // User type
    userType: {
      type: String,
      enum: ['handyman', 'customer', 'admin'],
      default: 'handyman',
      required: true
    },

    // Contact Information
    contact: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      default: ''
    },

    address: {
      type: String
    },

    // Profile Details
    bio: {
      type: String,
      default: '',
      maxlength: 500
    },

    // Profile Picture
    profilePic: {
      type: String,
      default: ''
    },

    profileImage: {
      type: String,
      default: ''
    },

    // Additional Links
    additionalLinks: {
      website: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' }
    },

    // Skills & Services
    skills: {
      type: [String],
      default: []
    },

    services: [
      {
        title: String,
        desc: String
      }
    ],

    // Certifications (upload)
    certifications: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ],

    // Counters (Boss requirements)
    activeOrderCount: {
      type: Number,
      default: 0
    },

    jobsInProgressCount: {
      type: Number,
      default: 0
    },

    jobsDoneCount: {
      type: Number,
      default: 0
    },

    reviewsCount: {
      type: Number,
      default: 0
    },

    notificationsCount: {
      type: Number,
      default: 0
    },

    // Plan Type (Boss requirement)
    planType: {
      type: String,
      enum: ['Basic', 'Standard', 'Premium'],
      default: 'Basic'
    },

    // Verified Badge (Boss requirement - Admin approval)
    verified: {
      type: Boolean,
      default: false
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes
HandymanSchema.index({ email: 1 });
HandymanSchema.index({ userId: 1 });
HandymanSchema.index({ handymanId: 1 });

export default mongoose.model('HandymanProfile', HandymanSchema);