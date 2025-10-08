import HandyProfile from "../models/HandyAddProfile.js";

// This function gets the profile of the logged-in handyman
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

    // Send the profile data back to frontend
    res.status(200).json(profile);
  } catch (err) {
    // If something goes wrong, log it and send error response
    console.error("Error fetching my profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// This function creates a new handyman profile
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