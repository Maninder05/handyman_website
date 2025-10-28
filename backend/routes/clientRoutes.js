import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import upload from '../middleware/upload.js'; 
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

// UPLOAD ROUTE
router.post(
  '/upload-profile-image',
  jwtAuthWithNext,
  upload.single("profileImage"), //  MULTER NOW HANDLES THE FILE
  uploadProfilePic //  CONTROLLER ALREADY SETS DB FIELD
);

// SAVED HANDYMEN ROUTES
router.post('/save-handyman', jwtAuthWithNext, saveHandyman);
router.delete('/saved-handyman/:handymanId', jwtAuthWithNext, removeSavedHandyman);

// DELETE ACCOUNT
router.delete('/delete', jwtAuthWithNext, deleteAccount);

export default router;
