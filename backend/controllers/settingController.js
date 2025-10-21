import ClientSetting from '../models/clientSetting.js';
import Client from '../models/clientProfile.js';
import bcrypt from 'bcryptjs';

// Get all settings
export const getSettings = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Use findOneAndUpdate with upsert to avoid duplicate key errors
    const settings = await ClientSetting.findOneAndUpdate(
      { email },
      { 
        $setOnInsert: {
          email,
          theme: 'light',
          language: 'en',
          timezone: 'UTC',
          privacySettings: {
            profileVisibility: 'public',
            showEmail: true,
            showPhone: false
          },
          twoFactorEnabled: false,
          notifications: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            jobAlerts: true,
            messageAlerts: true
          }
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(settings);
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update display settings (theme, language, timezone)
export const updateDisplay = async (req, res) => {
  try {
    const email = req.user?.email;
    const { theme, language, timezone } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedSettings = await ClientSetting.findOneAndUpdate(
      { email },
      { theme, language, timezone },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      message: "Display settings updated successfully",
      settings: updatedSettings
    });
  } catch (err) {
    console.error("Error updating display settings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update privacy settings
export const updatePrivacy = async (req, res) => {
  try {
    const email = req.user?.email;
    const privacySettings = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedSettings = await ClientSetting.findOneAndUpdate(
      { email },
      { privacySettings },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Privacy settings updated successfully",
      settings: updatedSettings
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

    const updatedSettings = await ClientSetting.findOneAndUpdate(
      { email },
      { twoFactorEnabled: enabled },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: `2FA ${enabled ? "enabled" : "disabled"} successfully`,
      settings: updatedSettings
    });
  } catch (err) {
    console.error("Error toggling 2FA:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update notifications
export const updateNotifications = async (req, res) => {
  try {
    const email = req.user?.email;
    const notifications = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedSettings = await ClientSetting.findOneAndUpdate(
      { email },
      { notifications },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Notification settings updated successfully",
      settings: updatedSettings
    });
  } catch (err) {
    console.error("Error updating notifications:", err);
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

    const client = await Client.findOne({ email });
    
    if (!client || !client.password) {
      return res.status(404).json({ message: "Client not found or no password set" });
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

// Delete account
export const deleteAccount = async (req, res) => {
  try {
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete client profile
    await Client.findOneAndDelete({ email });
    
    // Delete client settings
    await ClientSetting.findOneAndDelete({ email });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};