import mongoose from "mongoose";

const CardRequestSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    accountNumber: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "cardRequests",timestamps: true }
);

export default mongoose.model("CardRequest", CardRequestSchema);
