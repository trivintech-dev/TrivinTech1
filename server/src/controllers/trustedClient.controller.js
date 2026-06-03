import TrustedClient from "../models/TrustedClient.js";

export const listTrustedClients = async (_req, res, next) => {
    try {
        const trustedClients = await TrustedClient.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        return res.json({ trustedClients });
    } catch (error) {
        return next(error);
    }
};

export const getTrustedClient = async (req, res, next) => {
    try {
        const trustedClient = await TrustedClient.findById(req.params.id);
        if (!trustedClient) {
            return res.status(404).json({ message: "Trusted client not found" });
        }

        return res.json({ trustedClient });
    } catch (error) {
        return next(error);
    }
};

export const createTrustedClient = async (req, res, next) => {
    try {
        const trustedClient = await TrustedClient.create({ ...req.body, createdBy: req.user.id });
        return res.status(201).json({ trustedClient });
    } catch (error) {
        return next(error);
    }
};

export const updateTrustedClient = async (req, res, next) => {
    try {
        const trustedClient = await TrustedClient.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!trustedClient) {
            return res.status(404).json({ message: "Trusted client not found" });
        }

        return res.json({ trustedClient });
    } catch (error) {
        return next(error);
    }
};

export const deleteTrustedClient = async (req, res, next) => {
    try {
        const trustedClient = await TrustedClient.findByIdAndDelete(req.params.id);
        if (!trustedClient) {
            return res.status(404).json({ message: "Trusted client not found" });
        }

        return res.json({ message: "Trusted client deleted" });
    } catch (error) {
        return next(error);
    }
};