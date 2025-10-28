import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import { 
  getMyProfile, 
  createProfile, 
  updateProfile,
  uploadProfilePic,
  saveHandyman,
  removeSavedHandyman,
  deleteAccount
} from '../controllers/ClientController.js';

const router = express.Router();

// CLIENT PROFILE ROUTES
router.get('/me', jwtAuthWithNext, getMyProfile);
router.post('/', jwtAuthWithNext, createProfile);
router.put('/', jwtAuthWithNext, updateProfile);
router.put('/update', jwtAuthWithNext, updateProfile);

// FILE UPLOAD ROUTES
router.post('/upload-image', jwtAuthWithNext, uploadProfilePic);

// SAVED HANDYMEN ROUTES
router.post('/save-handyman', jwtAuthWithNext, saveHandyman);
router.delete('/saved-handyman/:handymanId', jwtAuthWithNext, removeSavedHandyman);

// DELETE ACCOUNT (password change is now in settingsRoutes!)
router.delete('/delete', jwtAuthWithNext, deleteAccount);

export default router;