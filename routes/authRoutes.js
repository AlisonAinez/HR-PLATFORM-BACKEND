const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "You are logged in", user: req.user });
});

router.get(
  "/admin-only",
  authMiddleware,
  requireRole("HR Admin", "Super Admin"),
  (req, res) => {
    res.json({ message: "Welcome, admin" });
  },
);

module.exports = router;
