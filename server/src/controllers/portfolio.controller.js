import Portfolio from "../models/Portfolio.js";
import cloudinary from "../config/cloudinary.js";

export const listPortfolios = async (req, res, next) => {
    try {
        const filter = req.query.all === "true" ? {} : { isActive: true };
        const portfolios = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
        return res.json({ portfolios });
    } catch (error) {
        return next(error);
    }
};

export const getPortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio item not found" });
        }

        return res.json({ portfolio });
    } catch (error) {
        return next(error);
    }
};

export const createPortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.create({ ...req.body, createdBy: req.user.id });
        return res.status(201).json({ portfolio });
    } catch (error) {
        return next(error);
    }
};

export const updatePortfolio = async (req, res, next) => {
    try {
        const payload = { ...req.body };

        if (payload.technologies && typeof payload.technologies === "string") {
            payload.technologies = payload.technologies.split(",").map((t) => t.trim()).filter(Boolean);
        }

        const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, payload, {
            new: true
        });

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio item not found" });
        }

        return res.json({ portfolio });
    } catch (error) {
        return next(error);
    }
};

export const deletePortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio item not found" });
        }

        // Delete image from Cloudinary if it exists
        if (portfolio.imagePublicId) {
            await cloudinary.uploader.destroy(portfolio.imagePublicId);
        }

        return res.json({ message: "Portfolio item deleted" });
    } catch (error) {
        return next(error);
    }
};

export const uploadPortfolioImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "trivin-portfolio",
            resource_type: "auto"
        });

        return res.json({ imageUrl: result.secure_url, imagePublicId: result.public_id });
    } catch (error) {
        return next(error);
    }
};

export const deletePortfolioImage = async (req, res, next) => {
    try {
        const { publicId } = req.body;

        if (!publicId) {
            return res.status(400).json({ message: "Public ID is required" });
        }

        await cloudinary.uploader.destroy(publicId);

        return res.json({ message: "Image deleted successfully" });
    } catch (error) {
        return next(error);
    }
};
