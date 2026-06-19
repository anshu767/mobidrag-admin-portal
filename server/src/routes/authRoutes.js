/**
 * Auth Routes
 * POST /api/auth/login - Admin login
 */

import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);

export default router;
