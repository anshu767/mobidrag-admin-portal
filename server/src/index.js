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

dotenv.config();

const app = express();

// DB
connectDB();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔════════════════════════════════════════╗
║   MobiDrag Admin Panel Server Running  ║
║   Port: ${PORT}                        ║
║   Environment: ${process.env.NODE_ENV} ║
╚════════════════════════════════════════╝
`);
});

export default app;