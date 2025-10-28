import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import {
  getMyProfile,
  createProfile,
  updateProfile,
  uploadProfilePic,
  uploadCertification,
  deleteCertification,
  deleteAccount,
  getAllHandymen,
  verifyHandyman
} from '../controllers/ControllerHandyProfile.js';

const router = express.Router();

// HANDYMAN PROFILE ROUTES
router.get('/me', jwtAuthWithNext, getMyProfile);
router.post('/', jwtAuthWithNext, createProfile);
router.put('/update', jwtAuthWithNext, updateProfile);

// FILE UPLOAD ROUTES
router.post('/upload-profile-pic', jwtAuthWithNext, uploadProfilePic);
router.post('/upload-certification', jwtAuthWithNext, uploadCertification);
router.delete('/certifications/:certificationId', jwtAuthWithNext, deleteCertification);

// DELETE ACCOUNT (password change is in settingsController!)
router.delete('/delete', jwtAuthWithNext, deleteAccount);

// PUBLIC/BROWSE ROUTES
router.get('/', getAllHandymen);

// ADMIN ROUTES
router.put('/verify/:handymanId', verifyHandyman);

export default router;