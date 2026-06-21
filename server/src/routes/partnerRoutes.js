// server/src/routes/partnerRoutes.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "Partners route working" });
});

export default router;