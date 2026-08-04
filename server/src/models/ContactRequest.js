import mongoose from "mongoose";

const contactRequestSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        subject: { type: String, required: true, trim: true },
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, trim: true },
        companyName: { type: String, trim: true },
        serviceNeeded: { type: String, required: true, trim: true },
        budgetRange: { type: String, trim: true },
        message: { type: String, required: true, trim: true },
        source: { type: String, trim: true, default: "contact-page" },
        status: { type: String, enum: ["open", "responded"], default: "open" },
        response: { type: String, trim: true },
        respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("ContactRequest", contactRequestSchema);
