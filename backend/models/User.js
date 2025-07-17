const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: "Name is required" },
    email: { type: String, required: "Email is required", unique: true },
    password: { type: String, required: "Password is required" },
    phone: { type: Number, required: "Phone number is required" },
    userType: { type: String, required: "User type is required" }, // Admin, Agent, Ordinary
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
