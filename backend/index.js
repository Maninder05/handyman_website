// -------------------------
// Load environment variables
// -------------------------
import dotenv from "dotenv";
dotenv.config();

// -------------------------
// Import core packages
// -------------------------
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// -------------------------
// Import database connection
// -------------------------
import { connectDB } from "./config/db.js";

// -------------------------
// Import route modules
// -------------------------
import RouterUser from "./routes/RouteUser.js";
import RouterHandyman from "./routes/handyRoutesAddProfile.js";
import RouterService from "./routes/CreateServiceRoutes.js";
import routeHandyFilter from "./routes/routeHandyFilter.js";

// ⚠️ PAYMENT ROUTES COMMENTED OUT - Uncomment when you have Stripe/PayPal keys
// import subscriptionRouter from "./routes/subscription.routes.js";
// import webhookRouter from "./routes/webhook.router.js";
// import paypalRouter from "./routes/paypal.routes.js";

// -------------------------
// Initialize app
// -------------------------
const app = express();
const PORT = process.env.PORT || 7000;

// -------------------------
// Connect to MongoDB
// -------------------------
connectDB();

// -------------------------
// CORS Middleware
// -------------------------
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.CLIENT_URL || "http://localhost:3000"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// -------------------------
// Body Parsers
// -------------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// -------------------------
// Routes
// -------------------------
app.use("/api/users", RouterUser);
app.use("/api/handymen", RouterHandyman);
app.use("/api/services", RouterService);
app.use("/api/handyfilter", routeHandyFilter);

// ⚠️ PAYMENT ROUTES COMMENTED OUT - Uncomment when you have Stripe/PayPal keys
// app.use("/api/subscriptions", subscriptionRouter);
// app.use("/api/paypal", paypalRouter);

// -------------------------
// Stripe webhook (raw body parser)
// ⚠️ COMMENTED OUT - Uncomment when you have STRIPE_SECRET_KEY
// -------------------------
// app.post(
//   "/api/webhooks/stripe",
//   express.raw({ type: "application/json" }),
//   (req, _res, next) => {
//     req.rawBody = req.body;
//     next();
//   },
//   webhookRouter
// );

// -------------------------
// Health Check Endpoint
// -------------------------
app.get("/", (req, res) =>
  res.json({
    success: true,
    message: "🚀 Backend is running successfully!",
    availableEndpoints: {
      users: "/api/users",
      handymen: "/api/handymen",
      services: "/api/services",
      handyfilter: "/api/handyfilter",
    },
  })
);

// -------------------------
// Static uploads folder
// -------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------------
// MongoDB Connection Fallback
// -------------------------
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/handyman_db")
    .then(() => console.log("✅ MongoDB connected successfully (fallback)"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// -------------------------
// Start server
// -------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Visit: http://localhost:${PORT}`);
  console.log(
    `💡 Payment features disabled - configure Stripe/PayPal to enable`
  );
});
