import Client from '../models/clientSettings.js';
import bcrypt from 'bcryptjs';

// Get all settings
export const getSettings = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const client = await Client.findOne({ email });
    
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      account: {
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        email: client.email || "",
        phone: client.phone || "",
        address: client.address || "",
        profileImage: client.profileImage || ""
      },
      privacy: client.privacySettings || {
        profileVisibility: "public",
        showEmail: true,
        showPhone: false
      },
      twoFactorEnabled: client.twoFactorEnabled || false,
      notifications: client.notificationSettings || {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        jobAlerts: true,
        messageAlerts: true
      },
      display: client.displaySettings || {
        theme: "light",
        language: "en",
        timezone: "UTC"
      }
    });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update account info
export const updateAccount = async (req, res) => {
  try {
    const email = req.user?.email;
    const { firstName, lastName, phone, address, profileImage } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { 
        firstName, 
        lastName, 
        phone, 
        address, 
        profileImage 
      },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Account updated successfully",
      client: updatedClient
    });
  } catch (err) {
    console.error("Error updating account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const email = req.user?.email;
    const { currentPassword, newPassword } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const client = await Client.findOne({ email });
    
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

// Update privacy settings
export const updatePrivacy = async (req, res) => {
  try {
    const email = req.user?.email;
    const { profileVisibility, showEmail, showPhone } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const privacySettings = {
      profileVisibility: profileVisibility || "public",
      showEmail: showEmail !== undefined ? showEmail : true,
      showPhone: showPhone !== undefined ? showPhone : false
    };

    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { privacySettings },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Privacy settings updated successfully",
      privacySettings: updatedClient.privacySettings
    });
  } catch (err) {
    console.error("Error updating privacy:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Toggle 2FA
export const toggle2FA = async (req, res) => {
  try {
    const email = req.user?.email;
    const { enabled } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (typeof enabled !== 'boolean') {
      return res.status(400).json({ message: "Invalid request" });
    }

    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { twoFactorEnabled: enabled },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: `2FA ${enabled ? "enabled" : "disabled"} successfully`,
      twoFactorEnabled: updatedClient.twoFactorEnabled
    });
  } catch (err) {
    console.error("Error toggling 2FA:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update notification settings
export const updateNotifications = async (req, res) => {
  try {
    const email = req.user?.email;
    const { 
      emailNotifications, 
      smsNotifications, 
      pushNotifications, 
      jobAlerts, 
      messageAlerts 
    } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notificationSettings = {
      emailNotifications: emailNotifications !== undefined ? emailNotifications : true,
      smsNotifications: smsNotifications !== undefined ? smsNotifications : false,
      pushNotifications: pushNotifications !== undefined ? pushNotifications : true,
      jobAlerts: jobAlerts !== undefined ? jobAlerts : true,
      messageAlerts: messageAlerts !== undefined ? messageAlerts : true
    };

    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { notificationSettings },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Notification settings updated successfully",
      notificationSettings: updatedClient.notificationSettings
    });
  } catch (err) {
    console.error("Error updating notifications:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update display settings
export const updateDisplay = async (req, res) => {
  try {
    const email = req.user?.email;
    const { theme, language, timezone } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const displaySettings = {
      theme: theme || "light",
      language: language || "en",
      timezone: timezone || "UTC"
    };

    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { displaySettings },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Display settings updated successfully",
      displaySettings: updatedClient.displaySettings
    });
  } catch (err) {
    console.error("Error updating display settings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete account
export const deleteAccount = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deletedClient = await Client.findOneAndDelete({ email });

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};