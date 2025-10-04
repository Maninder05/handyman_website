HEAD
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import RouterUser from './routes/RouteUser.js';
import RouterHandyman from './routes/handyRoutesAddProfile.js';

import dotenv from "dotenv";
main
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import RouterUser from "./routes/RouteUser.js"; // User routes
import RouterHandyman from "./routes/handyRoutes.js"; // Handyman routes
import RouterService from "./routes/CreateServiceRoutes.js";// ✅ New service routes

// import paymentRouter from "./routes/payment.router.js";
// import webhookRouter from "./routes/webhook.router.js";

const app = express();
const PORT = process.env.PORT || 7000;

HEAD
// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Routes
app.use('/api/users', RouterUser);
app.use('/api/handymen', RouterHandyman);

// ✅ Health check
app.get('/', (req, res) => res.send('Backend is running!'));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));

// ✅ Global error handler
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// // Stripe webhook route must come BEFORE express.json()
// app.post(
//   "/api/webhooks/stripe",
//   express.raw({ type: "application/json" }),
//   (req, res, next) => {
//     req.rawBody = req.body;
//     next();
//   },
//   webhookRouter
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.get("/", (req, res) => {
  res.send("Backend is running!");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

main
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});
