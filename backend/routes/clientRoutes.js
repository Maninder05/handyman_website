import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import { getMyProfile, createProfile, updateProfile } from '../controllers/ClientController.js';

const router = express.Router();

// Get logged-in client's profile
router.get('/me', jwtAuthWithNext, getMyProfile);

// Create client profile explicitly
router.post('/', jwtAuthWithNext, createProfile);

// Update client profile
router.put('/', jwtAuthWithNext, updateProfile);
router.put('/update', jwtAuthWithNext, updateProfile);

export default router;
