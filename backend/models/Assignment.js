const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint", required: true },
  status: { type: String, required: true },
  agentName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
