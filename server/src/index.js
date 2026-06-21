import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

dotenv.config();

const app = express();

// ✅ DB
connectDB();

// ✅ CORS (FINAL FIX)
const allowedOrigins = [
  "http://localhost:5173",
  "https://mobidrag-admin-portal-kr73.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // postman / mobile

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ LOG
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mobidrag-admin-portal-kr73.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

// ✅ ROOT
app.get("/", (req, res) => {
  res.send("MobiDrag Backend Running 🚀");
});

// ✅ HEALTH
app.get("/api/health", (req, res) => {
  res.json({ success: true });
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/deals", dealRoutes);

// ❌ HANDLERS
app.use(notFoundHandler);
app.use(errorHandler);

// ✅ START
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

export default app;