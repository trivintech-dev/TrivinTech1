import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        category: { type: String, trim: true },
        technologies: { type: [String], default: [] },
        imageUrl: { type: String },
        imagePublicId: { type: String },
        projectUrl: { type: String },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
