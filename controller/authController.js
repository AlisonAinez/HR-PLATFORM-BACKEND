const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// 1. Register User
// Public registration is disabled because employees are created exclusively by admins from the web dashboard.
// through POST/api/employees/add-employee

exports.register = async (req, res) => {
  return res.status(403).json({
    success: false,
    error: "Public registration is disabled. Accounts are created by an Admin.",
  });
};

// 2. Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        companyId: user.companyId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      token,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  req.body;
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 8 characters",
      });
    }
    const user = await User.findById(req.user.userId);
    const isMatch =
      user && (await bcrypt.compare(currentPassword, user.password));
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: "Password updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }
    const user = await User.findOne({
      email: req.body.email.toLowerCase().trim(),
    });
    let resetToken;
    if (user) {
      resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
      await user.save();
    }
    res.json({
      success: true,
      message: "If that email exists, a reset token was created.",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Token and a password of 8+ characters are required",
      });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Token is invalid or expired" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
