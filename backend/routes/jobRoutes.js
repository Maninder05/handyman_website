import express from 'express';
import jwtAuthWithNext from '../middleware/JwtAuthWithNext.js';
import {
  getMyJobs,
  getAvailableJobs,
  acceptJob,
  completeJob,
  rateJob
} from '../controllers/JobController.js';

const router = express.Router();

// Route to get all jobs for logged-in handyman
// Requires JWT token to verify who is logged in
router.get('/api/jobs/my-jobs', jwtAuthWithNext, getMyJobs);

// Route to get all available jobs 
// Requires JWT token
router.get('/api/jobs/available', jwtAuthWithNext, getAvailableJobs);

// Route for handyman to accept a job
// Requires JWT token to know who is accepting
router.post('/api/jobs/:jobId/accept', jwtAuthWithNext, acceptJob);

// Route for handyman to mark job as complete
// Requires JWT token and hours worked in request body
router.post('/api/jobs/:jobId/complete', jwtAuthWithNext, completeJob);

// Route for customer to rate a completed job
// No JWT needed for now (will add customer auth later)
router.post('/api/jobs/:jobId/rate', rateJob);

export default router;