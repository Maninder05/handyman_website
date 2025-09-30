import Handyman from '../modals/HandymanAddProfile.js';

export const createHandyman = async (req, res) => {
  try {
    const { name, email, phone, bio, services, skills } = req.body;
    const handyman = new Handyman({
      name,
      email,
      phone,
      bio,
      services,
      skills,
    });
    await handyman.save();
    res.status(201).json(handyman);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getHandymen = async (req, res) => {
  try {
    const all = await Handyman.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
