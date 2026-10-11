const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const requireRole = require("../middleware/roleCheck");
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  sendNotification,
} = require("../controller/notificationController");

router.get("/", verifyToken, getNotifications);
router.post("/", verifyToken, requireRole("Admin"), sendNotification);
router.put("/read-all", verifyToken, markAllAsRead);
router.put("/:id/read", verifyToken, markAsRead);

module.exports = router;
