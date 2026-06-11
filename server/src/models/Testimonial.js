import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true, trim: true },
    authorTitle: { type: String, trim: true, default: "" },
    authorCompany: { type: String, trim: true, default: "" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true, trim: true },
    avatarUrl: { type: String, default: null },
    imagePublicId: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

testimonialSchema.index({ order: 1, createdAt: -1 });

export default mongoose.model("Testimonial", testimonialSchema);
