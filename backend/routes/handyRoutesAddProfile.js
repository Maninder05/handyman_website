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

// ==========================================
// HANDYMAN PROFILE ROUTES
// ==========================================

// Get logged-in handyman's profile with stats (Boss requirement: fetch counts)
// GET /api/handymen/me
router.get('/me', jwtAuthWithNext, getMyProfile);

// Create new handyman profile
// POST /api/handymen
router.post('/', jwtAuthWithNext, createProfile);

// Update handyman profile
// PUT /api/handymen/update
router.put('/update', jwtAuthWithNext, updateProfile);

// ==========================================
// FILE UPLOAD ROUTES (Boss requirement)
// ==========================================

// Upload profile picture
// POST /api/handymen/upload-profile-pic
// Note: You'll need to add the upload middleware
// Example: router.post('/upload-profile-pic', jwtAuthWithNext, uploadMiddleware, uploadProfilePic);
router.post('/upload-profile-pic', jwtAuthWithNext, uploadProfilePic);

// Upload certification
// POST /api/handymen/upload-certification
// Note: You'll need to add the upload middleware
router.post('/upload-certification', jwtAuthWithNext, uploadCertification);

// Delete certification
// DELETE /api/handymen/certifications/:certificationId
router.delete('/certifications/:certificationId', jwtAuthWithNext, deleteCertification);

// ==========================================
// SETTINGS ROUTES
// ==========================================

// Change password
// PUT /api/handymen/change-password
router.put('/change-password', jwtAuthWithNext, changePassword);

// Delete account (Boss requirement: with confirmation)
// DELETE /api/handymen/delete
router.delete('/delete', jwtAuthWithNext, deleteAccount);

// ==========================================
// PUBLIC/BROWSE ROUTES
// ==========================================

// Get all handymen (with filters)
// GET /api/handymen?verified=true&planType=Premium&skills=plumbing,electrical
router.get('/', getAllHandymen);

// ==========================================
// ADMIN ROUTES (Boss requirement)
// ==========================================

// Verify/unverify handyman (admin only)
// PUT /api/handymen/verify/:handymanId
// TODO: Add admin auth middleware before this route
router.put('/verify/:handymanId', verifyHandyman);

export default router;