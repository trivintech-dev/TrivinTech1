import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        features: [{ type: String, trim: true }],
        badge: { type: String, trim: true },
        idealFor: { type: String, trim: true },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("PricingPlan", pricingPlanSchema);