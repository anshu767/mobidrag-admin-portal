/**
 * JWT Configuration
 * Handles JWT token generation and verification
 * Used for admin authentication and route protection
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = '7d'; // Token expires in 7 days

/**
 * Generate JWT Token
 * @param {String} userId - Admin user ID
 * @returns {String} - Signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

/**
 * Verify JWT Token
 * @param {String} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 * @throws {Error} - If token is invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

export default { generateToken, verifyToken };
