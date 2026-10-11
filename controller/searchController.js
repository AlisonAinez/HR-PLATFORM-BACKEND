const Employee = require("../models/employee");
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.searchEmployees = async (req, res) => {
  try {
    const { q, status, page = 1, limit = 10 } = req.query;
    const filter = {};
    filter.company = req.user.companyId;

    if (q) {
      const regex = new RegExp(escapeRegex(q), "i");
      filter.$or = [
        { fullName: regex },
        { jobTitle: regex },
        { department: regex },
      ];
    }

    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Employee.find(filter)
        .sort({ fullName: 1 })
        .skip(skip)
        .limit(Number(limit)),
      Employee.countDocuments(filter),
    ]);
    res.json({ success: true, total, page: Number(page), data });
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to search employees" });
  }
};
