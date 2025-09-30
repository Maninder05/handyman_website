import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import RouterUser from './routes/RouteUser.js';       // User routes
import RouterHandyman from './routes/handyRoutes.js'; // Handyman routes
import RouterService from './routes/serviceRoutes.js'; // ✅ Our new service route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', RouterUser);
app.use('/api/handymen', RouterHandyman);
app.use('/api/services', RouterService); // ✅ NEW

// Default test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection error:', err);
});

// Optional: global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});
