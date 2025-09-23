import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  filename: String,
  title: String,
  tags: [String], // ✅ New field
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);