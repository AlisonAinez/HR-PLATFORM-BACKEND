const Notification = require("../models/Notification");

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort(
      { createdAt: -1 },
    );

    return res.json(notifications);
  } catch (err) {
    console.error("Fetch Notifications Error:", err.message);
    return res
      .status(500)
      .json({ error: "Failed to retrieve user notifications" });
  }
};
