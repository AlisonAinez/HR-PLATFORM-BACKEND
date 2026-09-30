const express = require("express");
const router = express.Router();

// Middleware & Controllers
const authMiddleware = require("../middleware/auth.js");
const { getMyNotifications } = require("../controllers/notificationController");

// User notifications
router.get("/", authMiddleware, getMyNotifications);

module.exports = router;
