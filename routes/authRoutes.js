const express = require("express");
const router = express.Router();

// Controllers & Middleware
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const requireRole = require("../middleware/roleCheck");

// Public endpoints
router.post("/register", register);
router.post("/login", login);

// Protected user profile validation
router.get("/me", authMiddleware, (req, res) => {
  return res.json({
    authenticated: true,
    user: req.user,
  });
});

// Admin clearance verification
router.get("/admin-only", authMiddleware, requireRole("Admin"), (req, res) => {
  return res.json({
    status: "success",
    access: "granted",
  });
});

module.exports = router;
