import express from 'express';
import { createHandyman, getHandymen } from '../controllers/handymanController.js';

const router = express.Router();

router.post('/', createHandyman);
router.get('/', getHandymen);

export default router;
