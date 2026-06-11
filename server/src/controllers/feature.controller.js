import Feature from "../models/Feature.js";

export const listFeatures = async (req, res, next) => {
  try {
    const features = await Feature.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .populate("createdBy", "name email");

    return res.json({ features });
  } catch (error) {
    return next(error);
  }
};

export const listAllFeatures = async (req, res, next) => {
  try {
    const features = await Feature.find()
      .sort({ order: 1, createdAt: -1 })
      .populate("createdBy", "name email");

    return res.json({ features });
  } catch (error) {
    return next(error);
  }
};

export const getFeatureById = async (req, res, next) => {
  try {
    const feature = await Feature.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    return res.json({ feature });
  } catch (error) {
    return next(error);
  }
};

export const createFeature = async (req, res, next) => {
  try {
    const { title, description, icon, order, isActive } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const feature = await Feature.create({
      title,
      description,
      icon: icon || "Sparkles",
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      createdBy: req.user?.id
    });

    return res.status(201).json({ feature });
  } catch (error) {
    return next(error);
  }
};

export const updateFeature = async (req, res, next) => {
  try {
    const { title, description, icon, order, isActive } = req.body;

    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    if (title) feature.title = title;
    if (description) feature.description = description;
    if (icon) feature.icon = icon;
    if (order !== undefined) feature.order = order;
    if (isActive !== undefined) feature.isActive = isActive;

    await feature.save();

    return res.json({ feature });
  } catch (error) {
    return next(error);
  }
};

export const deleteFeature = async (req, res, next) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    return res.json({ message: "Feature deleted successfully", feature });
  } catch (error) {
    return next(error);
  }
};
