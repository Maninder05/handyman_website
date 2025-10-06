import HandyProfile from "../models/HandyAddProfile.js";

//  Create new profile
export const createHandyProfile = async (req, res) => {
  try {
    const newProfile = new HandyProfile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ message: "Error creating profile", error: err.message });
  }
};

// Get all profiles
export const getAllHandyProfiles = async (req, res) => {
  try {
    const profiles = await HandyProfile.find();
    res.status(200).json(profiles);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ message: "Error fetching profiles", error: err.message });
  }
};

//  Get single profile by ID
export const getHandyProfileById = async (req, res) => {
  try {
    const profile = await HandyProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// Update profile
export const updateHandyProfile = async (req, res) => {
  try {
    const updatedProfile = await HandyProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};

// Delete profile
export const deleteHandyProfile = async (req, res) => {
  try {
    const deleted = await HandyProfile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting profile", error: err.message });
  }
};
