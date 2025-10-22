import Client from "../models/clientProfile.js";

// Get logged-in client's profile
export const getMyProfile = async (req, res) => {
  try {
    const { id, email } = req.user;
    if (!id || !email) return res.status(401).json({ message: "Unauthorized" });

    // Try to find existing client
    let client = await Client.findOne({ userId: id });

    // Auto-create if doesn't exist
    if (!client) {
      client = await Client.create({ userId: id, email });
    }

    res.status(200).json(client);
  } catch (err) {
    console.error("Error fetching client profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create client profile (explicit route)
export const createProfile = async (req, res) => {
  try {
    const { id, email } = req.user;
    if (!id || !email) return res.status(401).json({ message: "Unauthorized" });

    const existingClient = await Client.findOne({ userId: id });
    if (existingClient) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const newClient = await Client.create({ userId: id, email, ...req.body });
    res.status(201).json({ message: "Profile created successfully", client: newClient });
  } catch (err) {
    console.error("Error creating client profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update client profile
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const updatedClient = await Client.findOneAndUpdate(
      { userId: id },
      { $set: req.body },
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
