import Client from '../models/clientProfile.js';

// Get logged-in client's profile
export const getMyProfile = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const client = await Client.findOne({ email });
    
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
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

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const newClient = new Client({
      ...req.body,
      email
    });

    await newClient.save();
    res.status(201).json({ message: "Profile created successfully", client: newClient });
  } catch (err) {
    console.error("Error creating client profile:", err);
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

    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ 
      message: "Profile updated successfully", 
      client: updatedClient 
    });
  } catch (err) {
    console.error("Error updating client profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};