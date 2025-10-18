import Client from '../models/clientProfile.js';

// Get logged-in client's profile
export const getMyProfile = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await Client.findOne({ email });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching client profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create client profile
export const createProfile = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingProfile = await Client.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const newProfile = new Client({
      ...req.body,
      email: email,
    });

    await newProfile.save();
    
    res.status(201).json({
      message: "Profile created successfully",
      profile: newProfile
    });
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update client profile
export const updateProfile = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedProfile = await Client.findOneAndUpdate(
      { email },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};