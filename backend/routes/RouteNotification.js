import express from 'express';
import { getNotifications, markAsRead, markAllRead } from '../controllers/ControllerNotification.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// router.get('/', auth, getNotifications);
router.get('/', getNotifications);
router.post('/mark-read/:id', markAsRead);
router.post('/mark-all-read', markAllRead);

export default router;
