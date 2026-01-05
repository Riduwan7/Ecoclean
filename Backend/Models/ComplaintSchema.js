import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pickupId: { type: mongoose.Schema.Types.ObjectId, ref: "PickupRequest" },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
  adminNotes: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
