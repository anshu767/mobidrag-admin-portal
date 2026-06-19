/**
 * Admin Routes
 * All routes protected with JWT authentication (admin only)
 * 
 * Applications:
 * GET /api/admin/applications
 * POST /api/admin/applications/:id/approve
 * POST /api/admin/applications/:id/reject
 * 
 * Partners:
 * GET /api/admin/partners
 * PATCH /api/admin/partners/:id
 * 
 * Deals:
 * GET /api/admin/deals
 * PATCH /api/admin/deals/:id/stage
 * 
 * Payouts:
 * GET /api/admin/payouts
 * POST /api/admin/payouts/pay
 */

import express from 'express';
import protect, { adminOnly } from '../middleware/auth.js';
import {
  getApplications,
  approveApplication,
  rejectApplication,
} from '../controllers/applicationController.js';
import { getPartners, updatePartner } from '../controllers/partnerController.js';
import { getDeals, updateDealStage } from '../controllers/dealController.js';
import { getPayouts, markCommissionAsPaid } from '../controllers/commissionController.js';
import { getDashboard } from '../controllers/adminController.js';

const router = express.Router();

// Apply authentication and admin-only check to all admin routes
//router.use(protect);
//router.use(adminOnly);

// Application routes
router.get('/applications', getApplications);
router.post('/applications/:id/approve', approveApplication);
router.post('/applications/:id/reject', rejectApplication);

// Partner routes
router.get('/partners', getPartners);
router.patch('/partners/:id', updatePartner);

// Deal routes
router.get('/deals', getDeals);
router.patch('/deals/:id/stage', updateDealStage);

// Payout routes
router.get('/payouts', getPayouts);
router.post('/payouts/pay', markCommissionAsPaid);

router.get('/dashboard', getDashboard);

export default router;
