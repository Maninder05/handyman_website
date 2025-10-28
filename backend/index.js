import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import http from "http";
import { Server } from "socket.io";
import fs from "fs"; 

// register passport strategies
import './config/passport.js';

// Routes
import RouterUser from './routes/RouteUser.js';
import RouterHandyman from './routes/handyRoutesAddProfile.js';
import RouterService from './routes/CreateServiceRoutes.js';
import RouterNotification from './routes/RouteNotification.js'; 
import clientRoutes from './routes/clientRoutes.js';
import settingsRoutes from './routes/settingRoutes.js';

dotenv.config();
// Create upload directories if they don't exist
const uploadDirs = [
  "uploads",
  "uploads/profiles",
  "uploads/certifications"
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created folder: ${dir}`);
  }
});

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Serve uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/users', RouterUser);
app.use('/api/handymen', RouterHandyman);
app.use('/api/services', RouterService);
app.use('/api/notifications', RouterNotification); 
app.use('/api/clients', clientRoutes);
app.use('/api/settings', settingsRoutes);

// Default test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on("sendNotification", ({ receiverId, notification }) => {
    io.to(receiverId).emit("receiveNotification", notification);
    console.log("Notification sent to", receiverId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(' Connected to MongoDB successfully!');
  server.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error(' Database connection error:', err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});
