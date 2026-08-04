import fs from "fs";
import PageContent from "../models/PageContent.js";
import cloudinary from "../config/cloudinary.js";

const normalizePage = (value) => (value || "").toLowerCase().trim();

const cleanupTempFile = (filePath) => {
  if (!filePath) return;
  fs.promises.unlink(filePath).catch(() => {});
};

export const getPageContent = async (req, res, next) => {
  try {
    const page = normalizePage(req.params.page);
    const sections = await PageContent.find({ page, isActive: true }).sort({ order: 1, createdAt: 1 });

    const content = {};
    sections.forEach((section) => {
      content[section.section] = section.kind === "list" ? section.items : section.content;
    });

    return res.json({ page, content, sections });
  } catch (error) {
    return next(error);
  }
};

export const listAllContent = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.page) {
      filter.page = normalizePage(req.query.page);
    }

    const sections = await PageContent.find(filter).sort({ page: 1, order: 1, createdAt: 1 });
    return res.json({ sections });
  } catch (error) {
    return next(error);
  }
};

export const getContentSection = async (req, res, next) => {
  try {
    const page = normalizePage(req.params.page);
    const doc = await PageContent.findOne({ page, section: req.params.section });

    if (!doc) {
      return res.status(404).json({ message: "Content section not found" });
    }

    return res.json({ section: doc });
  } catch (error) {
    return next(error);
  }
};

export const upsertContent = async (req, res, next) => {
  try {
    const { page, section, label, kind, content, items, order, isActive } = req.body;

    if (!page || !section) {
      return res.status(400).json({ message: "page and section are required" });
    }

    const update = { updatedBy: req.user?.id };
    if (label !== undefined) update.label = label;
    if (kind !== undefined) update.kind = kind;
    if (order !== undefined) update.order = order;
    if (content !== undefined) update.content = content;
    if (items !== undefined) update.items = items;
    if (isActive !== undefined) update.isActive = isActive;

    const doc = await PageContent.findOneAndUpdate(
      { page: normalizePage(page), section },
      {
        $set: update,
        $setOnInsert: { page: normalizePage(page), section }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json({ section: doc });
  } catch (error) {
    return next(error);
  }
};

export const updateContentById = async (req, res, next) => {
  try {
    const payload = { ...req.body, updatedBy: req.user?.id };
    delete payload._id;

    const doc = await PageContent.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!doc) {
      return res.status(404).json({ message: "Content section not found" });
    }

    return res.json({ section: doc });
  } catch (error) {
    return next(error);
  }
};

export const deleteContent = async (req, res, next) => {
  try {
    const doc = await PageContent.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: "Content section not found" });
    }

    return res.json({ message: "Content section deleted" });
  } catch (error) {
    return next(error);
  }
};

export const uploadContentImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "trivin-content",
      resource_type: "image"
    });

    cleanupTempFile(req.file.path);

    return res.json({
      imageUrl: result.secure_url,
      imagePublicId: result.public_id
    });
  } catch (error) {
    cleanupTempFile(req.file?.path);
    return next(error);
  }
};

export const deleteContentImage = async (req, res, next) => {
  try {
    const publicId = req.body.publicId || req.body.imagePublicId;
    if (!publicId) {
      return res.status(400).json({ message: "Public ID is required" });
    }

    await cloudinary.uploader.destroy(publicId);
    return res.json({ message: "Image deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
