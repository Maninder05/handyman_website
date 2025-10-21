import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import {
  getSettings,
  updateDisplay,
  updatePrivacy,
  toggle2FA,
  updateNotifications,
  changePassword,
  deleteAccount
} from '../controllers/settingController.js';

const router = express.Router();

// Get all settings
router.get('/', jwtAuthWithNext, getSettings);

// Update display settings (theme, language, timezone)
router.put('/display', jwtAuthWithNext, updateDisplay);

// Update privacy settings
router.put('/privacy', jwtAuthWithNext, updatePrivacy);

// Toggle 2FA
router.put('/2fa', jwtAuthWithNext, toggle2FA);

// Update notifications
router.put('/notifications', jwtAuthWithNext, updateNotifications);

// Change password
router.put('/password', jwtAuthWithNext, changePassword);

// Delete account
router.delete('/account', jwtAuthWithNext, deleteAccount);

export default router;