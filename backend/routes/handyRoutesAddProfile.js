import express from 'express';
import { createHandyman, getHandymen } from '../controllers/handyControllerAddprofile.js';

const router = express.Router();

// POST /api/handymen -> create profile
router.post('/', createHandyman);

// GET /api/handymen -> get all handymen
router.get('/', getHandymen);

export default router;
