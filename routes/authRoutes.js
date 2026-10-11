const express = require("express");
const router = express.Router();

const {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");
const { verifyToken } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/change-password", verifyToken, changePassword);

router.get("/me", verifyToken, (req, res) => {
  return res.json({
    message: "You are logged in",
    user: req.user,
  });
});

router.get("/me", verifyToken, (req, res) => {
  return res.json({
    message: "You are logged in",
    user: req.user,
  });
});

module.exports = router;
