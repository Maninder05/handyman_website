// backend/index.js

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Subscription from "./models/subscription.model.js";

import RouterUser from "./routes/RouteUser.js"; // User routes
import RouterHandyman from "./routes/handyRoutesAddProfile.js"; // Handyman routes
import RouterService from "./routes/CreateServiceRoutes.js"; // ✅ fixed file name here

import subscriptionRouter from "./routes/subscription.routes.js";
import webhookRouter from "./routes/webhook.router.js";
import paypalRouter from "./routes/paypal.routes.js"; // <- keep this import

const app = express();
const PORT = process.env.PORT || 8000;

//  Middleware - CORS handled manually
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//  Routes
app.use("/api/users", RouterUser);
app.use("/api/handymen", RouterHandyman); // <-- Your CRUD routes

//  Health check
app.get("/", (req, res) => res.send("Backend is running!"));

//  Static uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 1) Stripe webhook FIRST, with raw body (no JSON parser here)
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  (req, _res, next) => {
    req.rawBody = req.body; // keep raw buffer for signature verification
    next();
  },
  webhookRouter
);

// 2) JSON parsers for EVERYTHING ELSE (PayPal + your APIs)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3) Mount app routers AFTER parsers
app.use("/api/users", RouterUser);
app.use("/api/handymen", RouterHandyman);
app.use("/api/services", RouterService);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/paypal", paypalRouter);

//  MongoDB connection (real DB, not "test")
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "handyman_db", // ensures correct database, not test
  })
  .then(() => {
    console.log("Connected to MongoDB: handyman_db");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    Subscription.syncIndexes()
      .then(() => console.log("[mongo] Subscription indexes synced"))
      .catch((e) => console.error("[mongo] index sync error", e));
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

//  Global error handler (safety net)
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong on the server!" });
});
