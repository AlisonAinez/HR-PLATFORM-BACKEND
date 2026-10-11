const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const requireRole = require("../middleware/roleCheck");
const { searchEmployees } = require("../controller/searchController");

router.get("/employees", verifyToken, requireRole("Admin"), searchEmployees);

module.exports = router;
