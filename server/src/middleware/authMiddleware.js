import jwt from "jsonwebtoken";
import Partner from "../models/Partner.js";

// protect route
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Partner.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token" });
  }
};

// admin only
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only access" });
  }
  next();
};