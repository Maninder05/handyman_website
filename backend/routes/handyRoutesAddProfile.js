import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import upload from '../middleware/upload.js'; // 
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

// UPLOAD ROUTES
router.post('/upload-profile-pic', jwtAuthWithNext, upload.single("profileImage"), uploadProfilePic);
router.post('/upload-certification', jwtAuthWithNext, upload.single("certification"), uploadCertification);
router.delete('/certifications/:certificationId', jwtAuthWithNext, deleteCertification);

// DELETE ACCOUNT
router.delete('/delete', jwtAuthWithNext, deleteAccount);

// PUBLIC BROWSE
router.get('/', getAllHandymen);

// ADMIN VERIFY
router.put('/verify/:handymanId', verifyHandyman);

export default router;
