import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Brand", brandSchema);
