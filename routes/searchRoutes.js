const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const { searchEmployees } = require("../controllers/searchController");

router.get("/employees", authMiddleware, searchEmployees);

module.exports = router;
