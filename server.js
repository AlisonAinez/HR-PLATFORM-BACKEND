require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Enable cors config from env
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });
