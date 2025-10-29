// controllers/ControllerHandyFilter.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Handyman from "../models/ModelHandyFilter.js";

const JWT_EXPIRES_IN = "7d";

// ============================
// REGISTER HANDYMAN
// ============================
export const registerHandyman = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      experience,
      skills = [],
      hourlyRate,
      distanceRadiusKm,
      attributes = {},
    } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Check if already registered
    const existing = await Handyman.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new handyman
    const handyman = new Handyman({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      age,
      experience,
      skills,
      hourlyRate,
      distanceRadiusKm,
      attributes,
    });

    await handyman.save();

    // Create JWT token
    const token = jwt.sign(
      { id: handyman._id, email: handyman.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: "Handyman registered successfully.",
      handyman: {
        id: handyman._id,
        name: handyman.name,
        email: handyman.email,
      },
      token,
    });
  } catch (err) {
    console.error("❌ registerHandyman error:", err);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
};

// ============================
// LOGIN HANDYMAN
// ============================
export const loginHandyman = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Email and password are required." });

    const handyman = await Handyman.findOne({ email: email.toLowerCase() });
    if (!handyman)
      return res.status(401).json({ error: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, handyman.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password." });

    // Sign token
    const token = jwt.sign(
      { id: handyman._id, email: handyman.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      handyman: {
        id: handyman._id,
        name: handyman.name,
        email: handyman.email,
      },
      token,
    });
  } catch (err) {
    console.error(" loginHandyman error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

// ============================
// GET HANDYMAN PROFILE
// ============================
export const getHandymanProfile = async (req, res) => {
  try {
    const id = req.handymanId; // set by auth middleware
    const handyman = await Handyman.findById(id).select("-password");
    if (!handyman)
      return res.status(404).json({ error: "Handyman not found." });

    res.status(200).json({ success: true, handyman });
  } catch (err) {
    console.error("❌ getHandymanProfile error:", err);
    res.status(500).json({ error: "Failed to fetch profile." });
  }
};

// ============================
// UPDATE FILTER / PROFILE SETTINGS
// ============================
export const upsertHandymanFilter = async (req, res) => {
  try {
    const id = req.handymanId;
    const {
      name,
      age,
      experience,
      skills,
      hourlyRate,
      distanceRadiusKm,
      attributes,
    } = req.body;

    // Only update provided fields
    const update = {};
    if (name !== undefined) update.name = name;
    if (age !== undefined) update.age = age;
    if (experience !== undefined) update.experience = experience;
    if (Array.isArray(skills)) update.skills = skills;
    if (hourlyRate !== undefined) update.hourlyRate = hourlyRate;
    if (distanceRadiusKm !== undefined)
      update.distanceRadiusKm = distanceRadiusKm;
    if (attributes !== undefined) update.attributes = attributes;

    const handyman = await Handyman.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    ).select("-password");

    if (!handyman)
      return res.status(404).json({ error: "Handyman not found." });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      handyman,
    });
  } catch (err) {
    console.error("❌ upsertHandymanFilter error:", err);
    res.status(500).json({ error: "Failed to update handyman profile." });
  }
};
