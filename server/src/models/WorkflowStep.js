import mongoose from "mongoose";

const workflowStepSchema = new mongoose.Schema(
    {
        step: { type: String, required: true, trim: true },
        title: { type: String, required: true, trim: true },
        summary: { type: String, required: true, trim: true },
        duration: { type: String, trim: true },
        highlights: [{ type: String, trim: true }],
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("WorkflowStep", workflowStepSchema);