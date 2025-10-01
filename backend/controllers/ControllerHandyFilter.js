// controllers/controllerHandyFilter.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Handyman from "../models/Handyman.js";

const JWT_EXPIRES_IN = "7d"; // adjust as needed

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

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const existing = await Handyman.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const handyman = new Handyman({
      name,
      email: email.toLowerCase(),
      password: hashed,
      age,
      experience,
      skills,
      hourlyRate,
      distanceRadiusKm,
      attributes,
    });

    await handyman.save();

    // sign token
    const token = jwt.sign(
      { id: handyman._id, email: handyman.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: "Handyman registered.",
      handyman: {
        id: handyman._id,
        name: handyman.name,
        email: handyman.email,
      },
      token,
    });
  } catch (err) {
    console.error("registerHandyman error:", err);
    res.status(500).json({ error: "Registration failed." });
  }
};

export const loginHandyman = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required." });

    const handyman = await Handyman.findOne({ email: email.toLowerCase() });
    if (!handyman)
      return res.status(401).json({ error: "Invalid credentials." });

    const match = await bcrypt.compare(password, handyman.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const token = jwt.sign(
      { id: handyman._id, email: handyman.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      handyman: {
        id: handyman._id,
        name: handyman.name,
        email: handyman.email,
      },
      token,
    });
  } catch (err) {
    console.error("loginHandyman error:", err);
    res.status(500).json({ error: "Login failed." });
  }
};

export const getHandymanProfile = async (req, res) => {
  try {
    // auth middleware will set req.handymanId
    const id = req.handymanId;
    const handyman = await Handyman.findById(id).select("-password");
    if (!handyman)
      return res.status(404).json({ error: "Handyman not found." });
    res.json(handyman);
  } catch (err) {
    console.error("getHandymanProfile error:", err);
    res.status(500).json({ error: "Failed to fetch profile." });
  }
};

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
      { new: true, upsert: false }
    ).select("-password");
    if (!handyman)
      return res.status(404).json({ error: "Handyman not found." });

    res.json({ message: "Profile updated", handyman });
  } catch (err) {
    console.error("upsertHandymanFilter error:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
};
