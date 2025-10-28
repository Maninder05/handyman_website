const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// middlewares (must be before routes)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // <-- parses JSON bodies

// --- Mongoose models (JS) ---
const OfferSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  handymanId: { type: String, required: true },
  title: { type: String, required: true },
  note: { type: String },
  amountCents: { type: Number, required: true }, // no default 0
  currency: { type: String, default: 'cad' },
  status: { type: String, default: 'pending' },
  paymentStatus: { type: String, default: 'none' },
}, { timestamps: true });

const Offer = mongoose.model('Offer', OfferSchema);

// --- Routes (JS) ---

// Create offer
app.post('/api/handy-jobs', async (req, res) => {
  try {
    const {
      clientId,
      handymanId,
      title,
      note,
      currency = 'cad',
    } = req.body;

    // accept both number and string; coerce explicitly
    const amountCents = Number(req.body.amountCents);

    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      return res.status(400).json({ ok: false, error: 'amountCents must be a positive integer (cents)' });
    }

    const offer = await Offer.create({
      clientId,
      handymanId,
      title,
      note,
      amountCents,
      currency,
      status: 'pending',
    });

    return res.json({ ok: true, offer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// Get offer by id
app.get('/api/handy-jobs/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ ok: false, error: 'not found' });
    return res.json({ ok: true, offer });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// Accept offer (don’t touch amountCents)
app.post('/api/handy-jobs/:id/accept', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ ok: false, error: 'not found' });

    offer.status = 'accepted';
    await offer.save();

    // If you want to create a booking and return bookingID, do it here.
    // For now we just return the offer—frontend already handles this.
    return res.json({ ok: true, offer });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// --- boot ---
async function start() {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/handyman');
  const port = process.env.PORT || 7000;
  app.listen(port, () => console.log(`API on http://localhost:${port}`));
}
start();
