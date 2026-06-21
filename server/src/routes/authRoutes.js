import express from "express";

const router = express.Router();

// TEMP LOGIN (simple)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "123456") {
    return res.json({
      success: true,
      token: "dummy-token-123",
      user: { email }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

export default router;