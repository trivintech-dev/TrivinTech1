import PricingPlan from "../models/PricingPlan.js";

const normalizeFeatures = (features) => {
    if (Array.isArray(features)) {
        return features.map((feature) => String(feature).trim()).filter(Boolean);
    }

    if (typeof features === "string") {
        return features
            .split(/\r?\n/)
            .map((feature) => feature.trim())
            .filter(Boolean);
    }

    return [];
};

const normalizePayload = (body) => ({
    ...body,
    features: normalizeFeatures(body.features),
    order: Number(body.order) || 0,
    featured: body.featured === true || body.featured === "true",
    isActive: body.isActive === undefined ? true : body.isActive === true || body.isActive === "true"
});

export const listPricingPlans = async (_req, res, next) => {
    try {
        const pricingPlans = await PricingPlan.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        return res.json({ pricingPlans });
    } catch (error) {
        return next(error);
    }
};

export const listPricingPlansAdmin = async (_req, res, next) => {
    try {
        const pricingPlans = await PricingPlan.find().sort({ order: 1, createdAt: 1 });
        return res.json({ pricingPlans });
    } catch (error) {
        return next(error);
    }
};

export const getPricingPlan = async (req, res, next) => {
    try {
        const pricingPlan = await PricingPlan.findById(req.params.id);
        if (!pricingPlan || !pricingPlan.isActive) {
            return res.status(404).json({ message: "Pricing plan not found" });
        }

        return res.json({ pricingPlan });
    } catch (error) {
        return next(error);
    }
};

export const createPricingPlan = async (req, res, next) => {
    try {
        const pricingPlan = await PricingPlan.create({ ...normalizePayload(req.body), createdBy: req.user.id });
        return res.status(201).json({ pricingPlan });
    } catch (error) {
        return next(error);
    }
};

export const updatePricingPlan = async (req, res, next) => {
    try {
        const pricingPlan = await PricingPlan.findByIdAndUpdate(req.params.id, normalizePayload(req.body), {
            new: true
        });

        if (!pricingPlan) {
            return res.status(404).json({ message: "Pricing plan not found" });
        }

        return res.json({ pricingPlan });
    } catch (error) {
        return next(error);
    }
};

export const deletePricingPlan = async (req, res, next) => {
    try {
        const pricingPlan = await PricingPlan.findByIdAndDelete(req.params.id);
        if (!pricingPlan) {
            return res.status(404).json({ message: "Pricing plan not found" });
        }

        return res.json({ message: "Pricing plan deleted" });
    } catch (error) {
        return next(error);
    }
};