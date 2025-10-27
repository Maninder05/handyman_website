import mongoose from "mongoose";

const HandyProfileSchema = new mongoose.Schema(
  {
    // Unique handyman identifier (Boss requirement)
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
      trim: true,
      lowercase: true 
    },
    
    password: { 
      type: String, 
      required: true,
      minlength: 8
    },
    
    // User type (handyman, client, admin) - Boss requirement
    userType: { 
      type: String, 
      enum: ['handyman', 'client', 'admin'],
      default: 'handyman',
      required: true
    },
    
    // Contact Information (Boss: "contact" not "phone")
    contact: { 
      type: String,
      trim: true
    },
    
    address: { 
      type: String,
      trim: true
    },
    
    // Profile Details
    bio: { 
      type: String,
      maxlength: 500
    },
    
    // Profile Picture (Boss: "profilePic" not "profileImage")
    profilePic: { 
      type: String,
      default: ''
    },
    
    // Additional Links (Boss requirement - portfolio, social media, etc)
    additionalLinks: {
      portfolio: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      website: { type: String, default: '' }
    },
    
    // Certifications (Boss requirement - array of uploaded files)
    certifications: [
      {
        fileName: { type: String },
        fileUrl: { type: String },
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    
    // Skills (keeping from your original, useful feature)
    skills: { 
      type: [String], 
      default: [] 
    },
    
    // IMPORTANT: These counts are FETCHED from other models (Boss requirement)
    // We DON'T store them here to keep data accurate
    // activeOrdersCount - fetched from Jobs where status = 'pending'
    // jobsInProgressCount - fetched from Jobs where status = 'in-progress'
    // jobsDoneCount - fetched from Jobs where status = 'completed'
    // reviewsCount - fetched from Reviews model
    
    // Notifications count (Boss requirement)
    notificationsCount: { 
      type: Number, 
      default: 0 
    },
    
    // Subscription Plan Type (Boss requirement)
    planType: { 
      type: String, 
      enum: ['Basic', 'Standard', 'Premium'],
      default: 'Basic',
      required: true
    },
    
    // Admin Approval Status (Boss requirement)
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
    timestamps: true // Boss requirement - automatically adds createdAt and updatedAt
  }
);

// Index for faster queries
HandyProfileSchema.index({ email: 1 });
HandyProfileSchema.index({ handymanId: 1 });
HandyProfileSchema.index({ verified: 1 });

// Don't return password in JSON responses (security)
HandyProfileSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

const HandyProfile = mongoose.models.HandyProfile || mongoose.model("HandyProfile", HandyProfileSchema);

export default HandyProfile;