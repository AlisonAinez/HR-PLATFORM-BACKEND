const Notification = require("../models/notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });
    const unreadCount = notifications.filter((item) => !item.read).length;

    res.status(200).json({
      success: true,
      unreadCount,
      data: notifications,
      message: "Notifications fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get notifications" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { read: true },
      { new: true },
    );
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500; // bad id format
    res
      .status(status)
      .json({ success: false, message: "Failed to update notification" });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.userId, read: false },
      { read: true },
    );
    res
      .status(200)
      .json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update notifications" });
  }
};

const sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res
        .status(400)
        .json({ success: false, message: "userId and message are required" });
    }
    const notification = await Notification.create({ userId, message });
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to send notification" });
  }
};

const createNotification = async (userId, message) => {
  return Notification.create({ userId, message });
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  sendNotification,
  createNotification,
};
