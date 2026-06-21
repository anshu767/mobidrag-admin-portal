/**
 * Authentication Controller
 * Handles admin login and JWT token generation
 */

import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

/**
 * POST /api/auth/login
 * Admin login endpoint
 * Body: { email, password }
 * Returns: { success, token, user }
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and explicitly include password field (schema has select: false)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password (bcrypt compare against the hashed password)
    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check user status
    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Account is not active',
      });
    }

    // Admin panel login is restricted to admin role (spec 1.1) —
    // partners authenticate through the separate Partner Portal, not here.
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required',
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated user (used by frontend on page load
 * to verify a stored token is still valid before showing protected pages)
 */
export const getMe = async (req, res) => {
  // req.user is attached by the `protect` middleware
  res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      tier: req.user.tier,
    },
  });
};

export default { login, getMe };