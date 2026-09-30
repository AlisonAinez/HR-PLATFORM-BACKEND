const express = require("express");
const router = express.Router();

const { getNotifications } = require("../controllers/notificationController.js");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/notifications", authMiddleware, getNotifications);

module.exports = router;