const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Applicant", "Employee", "Manager", "HR Admin", "Super Admin"],
      default: "Employee",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
