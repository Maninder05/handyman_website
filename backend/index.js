// backend/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Subscription from "./models/subscription.model.js";


import RouterUser from "./routes/RouteUser.js";
import RouterHandyman from "./routes/handyRoutes.js";
import RouterService from "./routes/serviceRoutes.js";

import subscriptionRouter from "./routes/subscription.routes.js";
import webhookRouter from "./routes/webhook.router.js";
import paypalRouter from "./routes/paypal.routes.js"; // <- keep this import

const app = express();
const PORT = process.env.PORT || 7000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

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

// static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 3) Mount app routers AFTER parsers
app.use("/api/users", RouterUser);
app.use("/api/handymen", RouterHandyman);
app.use("/api/services", RouterService);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/paypal", paypalRouter); // <-- moved BELOW express.json()

app.get("/", (_req, res) => {
  res.send("Backend is running!");
});

Subscription.syncIndexes()
  .then(() => console.log("[mongo] Subscription indexes synced"))
  .catch((e) => console.error("[mongo] index sync error", e));
// Mongo
mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 120000,
    socketTimeoutMS: 120000,
    retryWrites: true,
    tls: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});
