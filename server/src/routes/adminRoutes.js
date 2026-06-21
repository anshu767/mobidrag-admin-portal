import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";

// Controllers
import { getDashboard } from "../controllers/dashboardController.js";

import {
  getApplications,
  approveApplication,
  rejectApplication,
} from "../controllers/applicationController.js";

import {
  getPartners,
  updatePartner,
  createPartner,
  deletePartner, // optional
} from "../controllers/partnerController.js";

import {
  getDeals,
  updateDealStage,
  createDeal,
} from "../controllers/dealController.js";

import {
  getPayouts,
  markCommissionAsPaid,
} from "../controllers/commissionController.js";

const router = express.Router();


// 🔐 Apply auth middleware to ALL routes
router.use(protect);
router.use(adminOnly);


// ================= DASHBOARD =================
router.get("/dashboard", getDashboard);


// ================= APPLICATIONS =================
router.get("/applications", getApplications);
router.post("/applications/:id/approve", approveApplication);
router.post("/applications/:id/reject", rejectApplication);


// ================= PARTNERS =================
router.get("/partners", getPartners);
router.post("/partners", createPartner); // 🔥 CREATE
router.patch("/partners/:id", updatePartner);
router.delete("/partners/:id", deletePartner); // optional


// ================= DEALS =================
router.get("/deals", getDeals);
router.post("/deals", createDeal); // 🔥 CREATE
router.patch("/deals/:id/stage", updateDealStage);


// ================= PAYOUTS =================
router.get("/payouts", getPayouts);
router.post("/payouts/pay", markCommissionAsPaid);


export default router;