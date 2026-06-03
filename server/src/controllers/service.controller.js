import Service from "../models/Service.js";

const slugify = (value) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const listServices = async (_req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
    return res.json({ services });
  } catch (error) {
    return next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: "Service not found" });
    }

    const related = await Service.find({
      _id: { $ne: service._id },
      category: service.category,
      isActive: true
    }).limit(3);

    return res.json({ service, related });
  } catch (error) {
    return next(error);
  }
};

export const getRelatedServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).limit(3);
    return res.json({ services });
  } catch (error) {
    return next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create({ ...req.body, createdBy: req.user.id });
    return res.status(201).json({ service });
  } catch (error) {
    return next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (typeof payload.price === "string" && payload.price !== "") {
      payload.price = Number(payload.price);
    }

    if (payload.title) {
      payload.slug = slugify(payload.title);
    }

    const service = await Service.findByIdAndUpdate(req.params.id, payload, {
      new: true
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json({ service });
  } catch (error) {
    return next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json({ message: "Service deleted" });
  } catch (error) {
    return next(error);
  }
};
