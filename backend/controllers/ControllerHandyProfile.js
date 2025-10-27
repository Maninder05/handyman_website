import HandyProfile from "../models/HandyAddProfile.js";
import bcrypt from "bcryptjs";


export const getMyProfile = async (req, res) => {
  try {
    // Get email from the decoded JWT token that middleware attached to req.user
    const email = req.user?.email;
    
    // If there's no email in the token, user is not authorized
    if (!email) {
      return res.status(401).json({ message: "Unauthorized, no email found in token" });
    }

    // Find the profile in database using the email
    const profile = await HandyProfile.findOne({ email });
    
    // If no profile exists, send 404 error
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }


    // For now, return profile with dummy stats until you create Job/Review models
    const profileWithStats = {
      ...profile.toObject(),
      activeOrdersCount: 0,
      jobsInProgressCount: 0,
      jobsDoneCount: 0,
      reviewsCount: 0,
      averageRating: 0
    };

    res.status(200).json(profileWithStats);
    
  } catch (err) {
    // If something goes wrong, log it and send error response
    console.error("Error fetching my profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// CREATE NEW HANDYMAN PROFILE

export const createProfile = async (req, res) => {
  try {
    // Get email from the decoded JWT token
    const email = req.user?.email;
    
    // If there's no email in the token, reject the request
    if (!email) {
      return res.status(401).json({ message: "Unauthorized, no email found in token" });
    }

    // Check if this user already has a profile
    const existingProfile = await HandyProfile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ message: "You already have a profile" });
    }

    // Create new profile using data from frontend plus email from token
    const newProfile = new HandyProfile({
      ...req.body,
      email: email,
    });

    // Save the profile to database
    await newProfile.save();
    
    // Send success response with the new profile
    res.status(201).json({
      message: "Profile created successfully",
      profile: newProfile
    });
  } catch (err) {
    // If something goes wrong, log it and send error response
    console.error("Error creating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE HANDYMAN PROFILE

export const updateProfile = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      name,
      contact,
      address,
      bio,
      additionalLinks,
      skills,
      planType
    } = req.body;

    // Find and update handyman
    const profile = await HandyProfile.findOneAndUpdate(
      { email },
      {
        $set: {
          ...(name && { name }),
          ...(contact && { contact }),
          ...(address && { address }),
          ...(bio && { bio }),
          ...(additionalLinks && { additionalLinks }),
          ...(skills && { skills }),
          ...(planType && { planType })
        }
      },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// UPLOAD PROFILE PICTURE 
export const uploadProfilePic = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // File URL (assuming you're using multer and storing in /uploads)
    const profilePicUrl = `/uploads/profiles/${req.file.filename}`;

    // Update handyman profile
    const profile = await HandyProfile.findOneAndUpdate(
      { email },
      { $set: { profilePic: profilePicUrl } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      profilePic: profilePicUrl
    });
  } catch (err) {
    console.error("Error uploading profile picture:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPLOAD CERTIFICATION (Boss requirement)

export const uploadCertification = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const certificationData = {
      fileName: req.file.originalname,
      fileUrl: `/uploads/certifications/${req.file.filename}`,
      uploadedAt: new Date()
    };

    // Add certification to handyman's certifications array
    const profile = await HandyProfile.findOneAndUpdate(
      { email },
      { $push: { certifications: certificationData } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Certification uploaded successfully",
      certification: certificationData
    });
  } catch (err) {
    console.error("Error uploading certification:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE CERTIFICATION

export const deleteCertification = async (req, res) => {
  try {
    const email = req.user?.email;
    const { certificationId } = req.params;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await HandyProfile.findOneAndUpdate(
      { email },
      { $pull: { certifications: { _id: certificationId } } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Certification deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting certification:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// CHANGE PASSWORD

export const changePassword = async (req, res) => {
  try {
    const email = req.user?.email;
    const { currentPassword, newPassword } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide current and new password" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    // Find handyman with password field
    const profile = await HandyProfile.findOne({ email }).select('+password');
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, profile.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    profile.password = hashedPassword;
    await profile.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// DELETE ACCOUNT

export const deleteAccount = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await HandyProfile.findOneAndDelete({ email });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // TODO: Also delete or archive related jobs, reviews, etc.

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// GET ALL HANDYMEN (for browsing/admin)

export const getAllHandymen = async (req, res) => {
  try {
    const { verified, planType, skills } = req.query;
    
    // Build filter
    const filter = { isActive: true };
    
    if (verified !== undefined) {
      filter.verified = verified === 'true';
    }
    
    if (planType) {
      filter.planType = planType;
    }
    
    if (skills) {
      filter.skills = { $in: skills.split(',') };
    }

    const handymen = await HandyProfile.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json(handymen);
  } catch (err) {
    console.error("Error fetching handymen:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// VERIFY HANDYMAN (Admin Only - Boss requirement)

export const verifyHandyman = async (req, res) => {
  try {
    const { handymanId } = req.params;
    const { verified } = req.body;
    
    // TODO: Add admin authentication check here
    
    const profile = await HandyProfile.findByIdAndUpdate(
      handymanId,
      { $set: { verified } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: `Handyman ${verified ? 'verified' : 'unverified'} successfully`,
      profile
    });
  } catch (err) {
    console.error("Error verifying handyman:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};