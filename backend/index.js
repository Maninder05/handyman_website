import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import passport from 'passport';
 
// register passport strategies
import './config/passport.js';
 
import RouterUser from './routes/RouteUser.js';       // User routes
import RouterHandyman from './routes/handyRoutes.js'; // Handyman routes
import RouterService from './routes/serviceRoutes.js'; //New service routes
 
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
app.use(cookieParser());
 
// Initialize passport (used by OAuth routes)
app.use(passport.initialize());
 
// ✅ Serve uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 
// Routes
app.use('/api/users', RouterUser);
app.use('/api/handymen', RouterHandyman);
app.use('/api/services', RouterService);
 
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
 
