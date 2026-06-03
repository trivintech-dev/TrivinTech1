import mongoose from "mongoose";

const slugify = (value) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, index: true },
    summary: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, default: 0 },
    category: { type: String, trim: true },
    duration: { type: String, trim: true },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

serviceSchema.pre("save", function setSlug(next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = slugify(this.title);
  }
  return next();
});

export default mongoose.model("Service", serviceSchema);
