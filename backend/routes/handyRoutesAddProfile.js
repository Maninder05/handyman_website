import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import {
  getMyProfile,
  createProfile,
  updateProfile,
  uploadProfilePic,
  uploadCertification,
  deleteCertification,
  changePassword,
  deleteAccount,
  getAllHandymen,
  verifyHandyman
} from '../controllers/ControllerHandyProfile.js';

const router = express.Router();

// HANDYMAN PROFILE ROUTES

router.get('/me', jwtAuthWithNext, getMyProfile);

// Create new handyman profile
// POST /api/handymen
router.post('/', jwtAuthWithNext, createProfile);

// Update handyman profile
// PUT /api/handymen/update
router.put('/update', jwtAuthWithNext, updateProfile);

// FILE UPLOAD ROUTES 


router.post('/upload-profile-pic', jwtAuthWithNext, uploadProfilePic);

// Upload certification
// POST /api/handymen/upload-certification
// Note: You'll need to add the upload middleware
router.post('/upload-certification', jwtAuthWithNext, uploadCertification);

// Delete certification
// DELETE /api/handymen/certifications/:certificationId
router.delete('/certifications/:certificationId', jwtAuthWithNext, deleteCertification);

// SETTINGS ROUTES


// Change password
// PUT /api/handymen/change-password
router.put('/change-password', jwtAuthWithNext, changePassword);

// Delete account
// DELETE /api/handymen/delete
router.delete('/delete', jwtAuthWithNext, deleteAccount);

// PUBLIC/BROWSE ROUTES


// Get all handymen (with filters)
// GET /api/handymen?verified=true&planType=Premium&skills=plumbing,electrical
router.get('/', getAllHandymen);

// ADMIN ROUTES 


// Verify/unverify handyman (admin only)
// PUT /api/handymen/verify/:handymanId
// TODO: Add admin auth middleware before this route
router.put('/verify/:handymanId', verifyHandyman);

export default router;