import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import { 
  getMyProfile, 
  createProfile, 
  updateProfile,
  uploadProfilePic,
  saveHandyman,
  removeSavedHandyman,
  changePassword,
  deleteAccount
} from '../controllers/ClientController.js';

const router = express.Router();

// ==========================================
// CLIENT PROFILE ROUTES
// ==========================================

// Get logged-in client's profile (with stats - Boss requirement)
// GET /api/clients/me
router.get('/me', jwtAuthWithNext, getMyProfile);

// Create client profile explicitly
// POST /api/clients
router.post('/', jwtAuthWithNext, createProfile);

// Update client profile (both routes for compatibility)
// PUT /api/clients
// PUT /api/clients/update
router.put('/', jwtAuthWithNext, updateProfile);
router.put('/update', jwtAuthWithNext, updateProfile);

// ==========================================
// FILE UPLOAD ROUTES
// ==========================================

// Upload profile picture
// POST /api/clients/upload-image
// Note: Add upload middleware when ready
router.post('/upload-image', jwtAuthWithNext, uploadProfilePic);

// ==========================================
// SAVED HANDYMEN ROUTES
// ==========================================

// Save/favorite a handyman
// POST /api/clients/save-handyman
router.post('/save-handyman', jwtAuthWithNext, saveHandyman);

// Remove saved handyman
// DELETE /api/clients/saved-handyman/:handymanId
router.delete('/saved-handyman/:handymanId', jwtAuthWithNext, removeSavedHandyman);

// ==========================================
// SETTINGS ROUTES
// ==========================================

// Change password
// PUT /api/clients/change-password
router.put('/change-password', jwtAuthWithNext, changePassword);

// Delete account (Boss requirement: with confirmation)
// DELETE /api/clients/delete
router.delete('/delete', jwtAuthWithNext, deleteAccount);

export default router;