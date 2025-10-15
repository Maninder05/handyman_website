import express from 'express';
import jwtAuthWithNext from '../middleware/jwtAuthWithNext.js';
import { getMyProfile, createProfile } from '../controllers/ControllerHandyProfile.js';

const router = express.Router();

// Route to get logged-in handyman's profile
// First runs jwtAuthWithNext to verify token, then runs getMyProfile
router.get('/me', jwtAuthWithNext, getMyProfile);

// Route to create a new handyman profile
// First runs jwtAuthWithNext to verify token, then runs createProfile
router.post('/', jwtAuthWithNext, createProfile);

export default router;