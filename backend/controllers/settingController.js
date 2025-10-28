import UserSetting from '../models/UserSetting.js';
import User from '../models/ModelUser.js';
import bcrypt from 'bcryptjs';

// Get all settings for logged-in user (CLIENT or HANDYMAN)
export const getSettings = async (req, res) => {
  try {
    const { id, email, userType } = req.user;
    
    if (!id || !email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find or create settings with default values
    let settings = await UserSetting.findOne({ userId: id });

    if (!settings) {
      // Auto-create settings for new users
      settings = await UserSetting.create({
        userId: id,
        email,
        userType,
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        notificationsEnabled: true,
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          jobAlerts: true,
          messageAlerts: true
        }
      });
    }

    res.status(200).json(settings);
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update display settings (CLIENT or HANDYMAN)
export const updateDisplay = async (req, res) => {
  try {
    const { id, email, userType } = req.user;
    const { theme, language, timezone } = req.body;
    
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate theme
    if (theme && !['light', 'dark', 'auto'].includes(theme)) {
      return res.status(400).json({ message: "Invalid theme value" });
    }

    // Validate language
    if (language && !['en', 'es', 'fr', 'de'].includes(language)) {
      return res.status(400).json({ message: "Invalid language value" });
    }

    // Validate timezone
    if (timezone && !['UTC', 'EST', 'CST', 'MST', 'PST'].includes(timezone)) {
      return res.status(400).json({ message: "Invalid timezone value" });
    }

    const updatedSettings = await UserSetting.findOneAndUpdate(
      { userId: id },
      { 
        theme, 
        language, 
        timezone,
        // Ensure userId and email are set (in case settings don't exist yet)
        $setOnInsert: { userId: id, email, userType }
      },
      { 
        new: true, 
        upsert: true, 
        runValidators: true 
      }
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

// Update notification settings (CLIENT or HANDYMAN)
export const updateNotifications = async (req, res) => {
  try {
    const { id, email, userType } = req.user;
    const notifications = req.body;
    
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate notification object
    const validKeys = ['emailNotifications', 'smsNotifications', 'pushNotifications', 'jobAlerts', 'messageAlerts'];
    const hasInvalidKeys = Object.keys(notifications).some(key => !validKeys.includes(key));
    
    if (hasInvalidKeys) {
      return res.status(400).json({ message: "Invalid notification settings" });
    }

    const updatedSettings = await UserSetting.findOneAndUpdate(
      { userId: id },
      { 
        notifications,
        $setOnInsert: { userId: id, email, userType }
      },
      { 
        new: true, 
        upsert: true 
      }
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

// Change password (CLIENT or HANDYMAN)
export const changePassword = async (req, res) => {
  try {
    const { id, email } = req.user;
    const { currentPassword, newPassword } = req.body;
    
    if (!id || !email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide current and new password" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    // Find user in User model (where password is stored!)
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ 
        message: "Password not set. You may have signed up with Google/Facebook. Please use 'Forgot Password' to set a password." 
      });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in User model
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete account (CLIENT or HANDYMAN)
export const deleteAccount = async (req, res) => {
  try {
    const { id, email, userType } = req.user;
    
    if (!id || !email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete user settings
    await UserSetting.findOneAndDelete({ userId: id });
    
    // Delete profile based on userType
    if (userType === 'customer') {
      const Client = (await import('../models/clientProfile.js')).default;
      await Client.findOneAndDelete({ userId: id });
    } else if (userType === 'handyman') {
      const HandyProfile = (await import('../models/HandyAddProfile.js')).default;
      await HandyProfile.findOneAndDelete({ userId: id });
    }
    
    // Delete user account
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};