/**
 * MobiDrag Admin Panel - Express Server
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load env
dotenv.config();

// Init app
const app = express();

// Connect DB
connectDB();

/**
 * 🔥 MIDDLEWARE (ORDER VERY IMPORTANT)
 */

// ✅ CORS FIRST
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * 🚀 ROUTES
 */

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running 🚀" });
});

// Auth
app.use("/api/auth", authRoutes);

// Admin (ONLY ONCE)
app.use("/api/admin", adminRoutes);

/**
 * ❗ ERROR HANDLERS
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * 🚀 START SERVER
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   MobiDrag Admin Panel Server Running  ║
║   Port: ${PORT}                        ║
║   Environment: ${process.env.NODE_ENV} ║
╚════════════════════════════════════════╝
`);
});

export default app;