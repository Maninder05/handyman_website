import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import {
  getSettings,
  updateAccount,
  changePassword,
  updatePrivacy,
  toggle2FA,
  updateNotifications,
  updateDisplay,
  deleteAccount
} from '../controllers/settingController.js';

const router = express.Router();

// Get all settings
router.get('/', jwtAuthWithNext, getSettings);

// Update account
router.put('/account', jwtAuthWithNext, updateAccount);

// Change password
router.put('/password', jwtAuthWithNext, changePassword);

// Update privacy
router.put('/privacy', jwtAuthWithNext, updatePrivacy);

// Toggle 2FA
router.put('/2fa', jwtAuthWithNext, toggle2FA);

// Update notifications
router.put('/notifications', jwtAuthWithNext, updateNotifications);

// Update display settings
router.put('/display', jwtAuthWithNext, updateDisplay);

// Delete account
router.delete('/account', jwtAuthWithNext, deleteAccount);

export default router;