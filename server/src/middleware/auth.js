import User from '../models/User.js';

// 🔥 TEMP AUTH BYPASS (for demo submission)
export const protect = async (req, res, next) => {
  req.user = {
    _id: "temp-admin",
    role: "admin"
  };
  next();
};

// ✅ ADMIN CHECK
export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin only access'
    });
  }
  next();
};

export default protect;