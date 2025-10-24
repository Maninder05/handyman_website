const express = require('express');
const router = express.Router();
const handyPaymentService = require('../services/handyPaymentService');

// Create booking (charge now)
router.post('/bookings', async (req, res) => {
  try {
    const data = await handyPaymentService.createBooking(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Complete & pay out to pro
router.post('/bookings/:id/complete', async (req, res) => {
  try {
    const booking = await handyPaymentService.completeAndPayout(req.params.id);
    res.json({ booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
