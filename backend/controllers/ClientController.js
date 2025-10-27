import Client from "../models/clientProfile.js";
import bcrypt from "bcryptjs";

// Import Job model for fetching counts (Boss requirement)
// You'll need to create this or I'll create it next
// import Job from "../models/Job.js";

// ==========================================
// GET LOGGED-IN CLIENT'S PROFILE (Boss requirement: with stats)
// ==========================================
export const getMyProfile = async (req, res) => {
  try {
    const { id, email } = req.user;
    
    if (!id || !email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Try to find existing client
    let client = await Client.findOne({ userId: id });

    // Auto-create if doesn't exist (your existing logic)
    if (!client) {
      client = await Client.create({ userId: id, email });
    }

    // ==========================================
    // FETCH COUNTS FROM JOBS MODEL (Boss requirement)
    // These should NOT be stored, they should be fetched
    // ==========================================
    
    // TODO: Uncomment when you have Job model
    /*
    const clientObjectId = client._id;
    
    // 1. Jobs Posted Count (total jobs posted by this client)
    const jobsPostedCount = await Job.countDocuments({ 
      clientId: clientObjectId 
    });
    
    // 2. Active Booking Count (jobs with status = 'pending' or 'in-progress')
    const activeBookingCount = await Job.countDocuments({ 
      clientId: clientObjectId,
      status: { $in: ['pending', 'in-progress'] }
    });
    
    // Return client with fetched stats
    const clientWithStats = {
      ...client.toObject(),
      jobsPostedCount,
      activeBookingCount
    };

    res.status(200).json(clientWithStats);
    */

    // For now, return client with stats from database
    // Once you create Job model, uncomment above code
    res.status(200).json(client);
    
  } catch (err) {
    console.error("Error fetching client profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ==========================================
// CREATE CLIENT PROFILE (explicit route)
// ==========================================
export const createProfile = async (req, res) => {
  try {
    const { id, email } = req.user;
    
    if (!id || !email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingClient = await Client.findOne({ userId: id });
    
    if (existingClient) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const newClient = await Client.create({ 
      userId: id, 
      email, 
      ...req.body 
    });
    
    res.status(201).json({ 
      message: "Profile created successfully", 
      client: newClient 
    });
  } catch (err) {
    console.error("Error creating client profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ==========================================
// UPDATE CLIENT PROFILE
// ==========================================
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    
    const {
      name,
      firstName,
      lastName,
      contact,
      phone,
      address,
      bio,
      additionalLinks,
      profilePic,
      profileImage
    } = req.body;

    const updatedClient = await Client.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          ...(name && { name }),
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(contact && { contact }),
          ...(phone && { phone }),
          ...(address && { address }),
          ...(bio && { bio }),
          ...(additionalLinks && { additionalLinks }),
          ...(profilePic && { profilePic }),
          ...(profileImage && { profileImage })
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      client: updatedClient,
    });
  } catch (err) {
    console.error("Error updating client profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ==========================================
// UPLOAD PROFILE PICTURE
// ==========================================
export const uploadProfilePic = async (req, res) => {
  try {
    const { id } = req.user;
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicUrl = `/uploads/profiles/${req.file.filename}`;

    const client = await Client.findOneAndUpdate(
      { userId: id },
      { 
        $set: { 
          profilePic: profilePicUrl,
          profileImage: profilePicUrl // Update both for compatibility
        } 
      },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
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

// ==========================================
// SAVE/FAVORITE HANDYMAN
// ==========================================
export const saveHandyman = async (req, res) => {
  try {
    const { id } = req.user;
    const { handymanId } = req.body;
    
    const client = await Client.findOneAndUpdate(
      { userId: id },
      { $addToSet: { savedHandymen: handymanId } }, // addToSet prevents duplicates
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Handyman saved successfully",
      savedHandymen: client.savedHandymen
    });
  } catch (err) {
    console.error("Error saving handyman:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ==========================================
// REMOVE SAVED HANDYMAN
// ==========================================
export const removeSavedHandyman = async (req, res) => {
  try {
    const { id } = req.user;
    const { handymanId } = req.params;
    
    const client = await Client.findOneAndUpdate(
      { userId: id },
      { $pull: { savedHandymen: handymanId } },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Handyman removed from saved list",
      savedHandymen: client.savedHandymen
    });
  } catch (err) {
    console.error("Error removing saved handyman:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ==========================================
// CHANGE PASSWORD
// ==========================================
export const changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide current and new password" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    const client = await Client.findOne({ userId: id }).select('+password');
    
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, client.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    client.password = hashedPassword;
    await client.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ==========================================
// DELETE ACCOUNT
// ==========================================
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;
    
    const client = await Client.findOneAndDelete({ userId: id });
    
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // TODO: Also delete or archive related jobs

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};