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

// Routers
import RouterUser from './routes/RouteUser.js';
import RouterHandyman from './routes/handyRoutesAddProfile.js';
import RouterService from './routes/CreateServiceRoutes.js';
import subscriptionRouter from "./routes/subscription.routes.js";
import webhookRouter from "./routes/webhook.router.js";
import paypalRouter from "./routes/paypal.routes.js";
import jobRoutes from './routes/jobRoutes.js'; // Added job routes

import Subscription from "./models/subscription.model.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(passport.initialize());

// Health check
app.get('/', (req, res) => res.send('Backend is running!'));

// Static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Stripe webhook raw parser
app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), (req, _res, next) => {
  req.rawBody = req.body;
  next();
}, webhookRouter);

// Routes
app.use("/api/users", RouterUser);
app.use("/api/handymen", RouterHandyman);
app.use("/api/services", RouterService);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/paypal", paypalRouter);
app.use(jobRoutes); // Added job routes - uses /api/jobs prefix

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { dbName: "handyman_db" })
  .then(() => {
    console.log("Connected to MongoDB: handyman_db");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    Subscription.syncIndexes().then(() => console.log("[mongo] Subscription indexes synced"));
  })
  .catch(err => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});