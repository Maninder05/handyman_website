// backend/index.js
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import RouterUser from "./routes/RouteUser.js";
import RouterHandyman from "./routes/handyRoutes.js";
import RouterService from "./routes/serviceRoutes.js";

import subscriptionRouter from "./routes/subscription.routes.js";
import webhookRouter from "./routes/webhook.router.js";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Stripe webhook route must come BEFORE express.json()
app.use(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  (req, _res, next) => {
    // keep the raw buffer for Stripe signature verification
    req.rawBody = req.body;
    next();
  },
  webhookRouter
);

// Parsers for the rest of the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static files (unrelated to billing, keep if you use file uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", RouterUser);
app.use("/api/handymen", RouterHandyman);
app.use("/api/services", RouterService);

// Subscriptions API (Stripe Checkout)
app.use("/api/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 120000, // 120s to allow Atlas to wake/select primary
  socketTimeoutMS: 120000,
  retryWrites: true,
  tls: true, // explicit
}).then(() => {
  console.log("Connected to MongoDB successfully!");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((err) => {
  console.error("Database connection error:", err);
});


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});
