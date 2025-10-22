const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllRead } = require('../controllers/notificationController');
const auth = require('../middleware/auth'); // put your auth middleware

router.get('/', auth, getNotifications);
router.post('/mark-read/:id', auth, markAsRead);
router.post('/mark-all-read', auth, markAllRead);

module.exports = router;
