const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("./models/User");
const Complaint = require("./models/Complaint");
const Message = require("./models/Message");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/issue-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("[✓] Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/** -------------------- USER SIGNUP -------------------- **/
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      userType,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** -------------------- USER LOGIN -------------------- **/
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Exclude password before sending back
    const { password: pw, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** -------------------- GET USERS BY TYPE -------------------- **/
app.get("/users/agents", async (req, res) => {
  try {
    const agents = await User.find({ userType: "Agent" });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch agents", error: err.message });
  }
});

app.get("/users/ordinary", async (req, res) => {
  try {
    const users = await User.find({ userType: "Ordinary" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

/** -------------------- DELETE USER -------------------- **/
app.delete("/users/ordinary/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    await Complaint.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);

    res.json({ message: "User and related complaints deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete error", error: err.message });
  }
});

/** -------------------- COMPLAINT ROUTES -------------------- **/
app.post("/complaints/:userId", async (req, res) => {
  try {
    const complaint = new Complaint({ ...req.body, userId: req.params.userId });
    const saved = await complaint.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to register complaint", error: err.message });
  }
});

app.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to get complaints", error: err.message });
  }
});

app.get("/complaints/user/:id", async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user complaints", error: err.message });
  }
});

app.put("/complaints/:complaintId", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Complaint.findByIdAndUpdate(req.params.complaintId, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Complaint not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint", error: err.message });
  }
});

/** -------------------- MESSAGES -------------------- **/
app.post("/messages", async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;
    const msg = new Message({ name, message, complaintId });
    const saved = await msg.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
});

app.get("/messages/:complaintId", async (req, res) => {
  try {
    const messages = await Message.find({ complaintId: req.params.complaintId }).sort("-createdAt");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to get messages", error: err.message });
  }
});

/** -------------------- UPDATE USER -------------------- **/
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updated = await User.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
});

/** -------------------- SERVER LISTEN -------------------- **/
app.listen(PORT, () => {
  console.log(`[✓] Server running at http://localhost:${PORT}`);
});
