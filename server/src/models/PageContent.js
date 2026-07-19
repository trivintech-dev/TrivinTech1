import mongoose from "mongoose";

const pageContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, trim: true, lowercase: true },
    section: { type: String, required: true, trim: true },
    label: { type: String, trim: true },
    kind: { type: String, enum: ["single", "list"], default: "single" },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    items: { type: [mongoose.Schema.Types.Mixed], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, minimize: false }
);

pageContentSchema.index({ page: 1, section: 1 }, { unique: true });

export default mongoose.model("PageContent", pageContentSchema);
