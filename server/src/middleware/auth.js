/**
 * Authentication Middleware
 * 1. Verifies JWT token from Authorization header
 * 2. Extracts user info and attaches to request
 * 3. Can check for specific roles (admin only)
 */

import { verifyToken } from '../config/jwt.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized - no token provided' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Attach user to request
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token validation failed' 
    });
  }
};

/**
 * Admin-only middleware
 * Ensures only admin users can access routes
 */
export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required',
    });
  }
  next();
};

export default protect;
