import mongoose from "mongoose";

const trustedClientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        badge: { type: String, default: "Verified partner", trim: true },
        summary: { type: String, required: true, trim: true },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("TrustedClient", trustedClientSchema);