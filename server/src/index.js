import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// ✅ ROUTES IMPORT
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

dotenv.config();

const app = express();

// ✅ DB CONNECT
connectDB();

// ✅ CORS FIX (IMPORTANT FOR VERCEL)
app.use(
  cors({
    origin: "*", // 🔥 abhi ke liye open rakho (safe for demo)
    credentials: true,
  })
);

// ✅ BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ LOGGING
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ ROOT ROUTE (ab / open karoge to error nahi aayega)
app.get("/", (req, res) => {
  res.send("🚀 MobiDrag Backend Running");
});

// ✅ HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running 🚀" });
});

// ✅ MAIN ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/partners", partnerRoutes); // 🔥 FIX
app.use("/api/deals", dealRoutes);       // 🔥 OPTIONAL

// ❌ NOT FOUND
app.use(notFoundHandler);

// ❌ ERROR HANDLER
app.use(errorHandler);

// ✅ SERVER START
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