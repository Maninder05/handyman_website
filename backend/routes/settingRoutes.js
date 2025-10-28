import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import {
  getSettings,
  updateDisplay,
  updateNotifications,
  changePassword,
  deleteAccount
} from '../controllers/settingController.js';

const router = express.Router();

// Get all settings (works for both client and handyman)
router.get('/', jwtAuthWithNext, getSettings);

// Update display settings
router.put('/display', jwtAuthWithNext, updateDisplay);

// Update notification settings
router.put('/notifications', jwtAuthWithNext, updateNotifications);

// Change password
router.put('/password', jwtAuthWithNext, changePassword);

// Delete account
router.delete('/account', jwtAuthWithNext, deleteAccount);

export default router;