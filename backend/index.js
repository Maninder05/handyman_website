import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import RouterUser from './routes/RouteUser.js';       // User routes
import RouterHandyman from './routes/handyRoutesAddProfile.js'; // Handyman routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// ✅ CORS Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000", // fallback for safety
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json({ limit: "10mb" })); // allow image base64 payloads
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Routes
app.use('/api/users', RouterUser);
app.use('/api/handymen', RouterHandyman);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// ✅ Mongo connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});
