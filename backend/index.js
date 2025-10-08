// backend/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import Subscription from "./models/subscription.model.js";

// Routers
import RouterUser from "./routes/RouteUser.js";
import RouterHandyman from "./routes/handyRoutes.js";
import RouterService from "./routes/serviceRoutes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import webhookRouter from "./routes/webhook.router.js";          // Membership (Stripe) webhooks
import paypalRouter from "./routes/paypal.routes.js";
import clientWebhookRouter from "./routes/clientWebhook.router.js"; // Client → Handyman payment webhooks
import clientPayRouter from "./routes/clientPayRouter.js";          // Client payment API (create-intent, etc.)

const app = express();
const PORT = process.env.PORT || 7000;

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. http://localhost:3000
    credentials: true,
  })
);

// ------------------------------------------------------------
// 1) Webhooks FIRST (must use raw body, BEFORE express.json())
// ------------------------------------------------------------

// Membership subscription webhook (Stripe)
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  (req, _res, next) => {
    // keep raw buffer around for signature verification in controller
    req.rawBody = req.body;
    next();
  },
  webhookRouter
);

// Client → Handyman payments webhook (Stripe)
app.post(
  "/api/client-webhook",
  express.raw({ type: "application/json" }),
  (req, _res, next) => {
    req.rawBody = req.body;
    next();
  },
  clientWebhookRouter
);

// ------------------------------------------------------------
// 2) JSON parsers for normal routes (AFTER webhooks)
// ------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------------------------------------------
// 3) Static files
// ------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------------------------------------------------
// 4) App routers (normal JSON routes)
// ------------------------------------------------------------
app.use("/api/client-pay", clientPayRouter);      // e.g. POST /api/client-pay/create-intent
app.use("/api/users", RouterUser);
app.use("/api/handymen", RouterHandyman);
app.use("/api/services", RouterService);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/paypal", paypalRouter);

// Root
app.get("/", (_req, res) => {
  res.send("Backend is running!");
});

// ------------------------------------------------------------
// 5) Sync indexes (optional, won’t block startup)
// ------------------------------------------------------------
Subscription.syncIndexes()
  .then(() => console.log("[mongo] Subscription indexes synced"))
  .catch((e) => console.error("[mongo] index sync error", e));

// ------------------------------------------------------------
// 6) Mongo connect then start server
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// 7) Error handler (last middleware)
// ------------------------------------------------------------
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  // If a webhook route leaked raw body parsing errors, make sure we reply safely
  const status = err.statusCode || err.status || 500;
  res.status(status).json({ error: err.message || "Something went wrong!" });
});
