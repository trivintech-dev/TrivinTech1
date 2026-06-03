import mongoose from "mongoose";

const slugify = (value) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, index: true },
    description: { type: String, trim: true },
    location: { type: String, trim: true },
    type: { type: String, trim: true },
    salaryRange: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

jobSchema.pre("save", function setSlug(next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = slugify(this.title);
  }
  return next();
});

export default mongoose.model("Job", jobSchema);
