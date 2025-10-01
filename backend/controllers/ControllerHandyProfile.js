import Handyman from '../models/HandyAddProfile.js';

// Create a new handyman profile
export const createHandyman = async (req, res) => {
  try {
    const { name, email, phone, bio, services, skills, profileImage } = req.body;

    // Basic validation
    if (!name || !email || !bio) {
      return res.status(400).json({ error: 'Name, email, and bio are required.' });
    }

    // Check if email already exists
    const existing = await Handyman.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists. Use a different email.' });
    }

    // Create handyman
    const handyman = new Handyman({
      name,
      email,
      phone,
      bio,
      services: services || [],
      skills: skills || [],
      profileImage: profileImage || '', // handle missing image gracefully
    });

    await handyman.save();

    res.status(201).json({
      message: 'Profile created successfully',
      handyman,
    });
  } catch (err) {
    console.error('Error creating handyman:', err);
    res.status(500).json({ error: 'Server error. Could not create profile.' });
  }
};

// Get all handymen
export const getHandymen = async (req, res) => {
  try {
    const all = await Handyman.find();
    res.json(all);
  } catch (err) {
    console.error('Error fetching handymen:', err);
    res.status(500).json({ error: 'Server error. Could not fetch handymen.' });
  }
};
