import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    // User reference (your existing structure)
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    // Unique client identifier (Boss requirement)
    clientId: { 
      type: String, 
      unique: true, 
      required: true,
      default: () => `CL${Date.now()}${Math.floor(Math.random() * 1000)}`
    },
    
    // Basic Information
    name: { 
      type: String, 
      trim: true 
    },
    
    firstName: { 
      type: String, 
      trim: true 
    },
    
    lastName: { 
      type: String, 
      trim: true 
    },
    
    email: { 
      type: String, 
      required: true, 
      trim: true, 
      unique: true,
      lowercase: true
    },
    
    password: { 
      type: String, 
      required: true,
      minlength: 8
    },
    
    // User type (Boss requirement)
    userType: { 
      type: String, 
      enum: ['handyman', 'client', 'admin'],
      default: 'client',
      required: true
    },
    
    // Contact Information (Boss: "contact" not just "phone")
    contact: { 
      type: String,
      trim: true
    },
    
    phone: { 
      type: String 
    },
    
    address: { 
      type: String 
    },
    
    // Profile Details (Boss requirement)
    bio: { 
      type: String,
      maxlength: 500
    },
    
    // Profile Picture (Boss: "profilePic" to match handyman)
    profilePic: { 
      type: String,
      default: ''
    },
    
    // Keep your old one too for compatibility
    profileImage: { 
      type: String 
    },
    
    // Additional Links (Boss requirement - same as handyman)
    additionalLinks: {
      website: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' }
    },
    
    // Notifications count (Boss requirement)
    notificationsCount: { 
      type: Number, 
      default: 0 
    },
    
    // Jobs Posted Count (Boss requirement)
    jobsPostedCount: { 
      type: Number, 
      default: 0 
    },
    
    // Your existing fields (keep for compatibility)
    jobsPosted: { 
      type: Number, 
      default: 0 
    },
    
    // Active Booking Count (Boss requirement)
    activeBookingCount: { 
      type: Number, 
      default: 0 
    },
    
    // Your existing fields (keep for compatibility)
    activeJobs: { 
      type: Number, 
      default: 0 
    },
    
    totalSpent: { 
      type: Number, 
      default: 0 
    },
    
    // Saved/Favorite Handymen
    savedHandymen: { 
      type: [String], 
      default: [] 
    },
    
    // Recent Jobs
    recentJobs: [
      {
        title: String,
        description: String,
        status: String,
        budget: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    
    // Account status
    isActive: { 
      type: Boolean, 
      default: true 
    }
  },
  { 
    timestamps: true // Boss requirement - createdAt, updatedAt
  }
);

// Indexes for faster queries
ClientSchema.index({ email: 1 });
ClientSchema.index({ userId: 1 });
ClientSchema.index({ clientId: 1 });

// Don't return password in JSON responses
ClientSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);