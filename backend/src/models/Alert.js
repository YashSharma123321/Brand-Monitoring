import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  message: { type: String, required: true },
  mentionsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Alert", alertSchema);
