import mongoose from "mongoose";

const mentionSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  source: String,
  text: String,
  sentiment: String,
  link: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Mention", mentionSchema);
