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

    // Find user and include password field (normally excluded)
   const user = await User.findOne({ email });

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}

// ✅ SAFE CHECK
if (!user.password) {
  return res.status(500).json({
    message: "Password field missing in DB",
  });
}

if (user.password !== password) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}
    // Check password
    const isPasswordMatch = await user.comparePassword(password);

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

export default { login };
