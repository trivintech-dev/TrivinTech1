import Testimonial from "../models/Testimonial.js";
import { v2 as cloudinary } from "cloudinary";

export const listTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .populate("user", "name");

    return res.json({ testimonials });
  } catch (error) {
    return next(error);
  }
};

export const listAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ order: 1, createdAt: -1 })
      .populate("user", "name")
      .populate("createdBy", "name");

    return res.json({ testimonials });
  } catch (error) {
    return next(error);
  }
};

export const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
      .populate("user", "name email")
      .populate("createdBy", "name email");

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.json({ testimonial });
  } catch (error) {
    return next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const { authorName, authorTitle, authorCompany, rating, comment, order, avatarUrl } = req.body;

    if (!authorName || !comment || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const testimonial = await Testimonial.create({
      authorName,
      authorTitle: authorTitle || "",
      authorCompany: authorCompany || "",
      rating,
      comment,
      order: order || 0,
      avatarUrl: avatarUrl || null,
      createdBy: req.user?.id,
      isActive: true
    });

    return res.status(201).json({ testimonial });
  } catch (error) {
    return next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { authorName, authorTitle, authorCompany, rating, comment, order, isActive, avatarUrl } = req.body;

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    if (authorName) testimonial.authorName = authorName;
    if (authorTitle !== undefined) testimonial.authorTitle = authorTitle;
    if (authorCompany !== undefined) testimonial.authorCompany = authorCompany;
    if (rating) testimonial.rating = rating;
    if (comment) testimonial.comment = comment;
    if (order !== undefined) testimonial.order = order;
    if (isActive !== undefined) testimonial.isActive = isActive;
    if (avatarUrl !== undefined) testimonial.avatarUrl = avatarUrl;

    await testimonial.save();

    return res.json({ testimonial });
  } catch (error) {
    return next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Delete image from Cloudinary if exists
    if (testimonial.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(testimonial.imagePublicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
      }
    }

    return res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

export const uploadTestimonialImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "trivin-testimonials",
      resource_type: "auto"
    });

    return res.json({
      imageUrl: result.secure_url,
      imagePublicId: result.public_id
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteTestimonialImage = async (req, res, next) => {
  try {
    const { imagePublicId } = req.body;

    if (!imagePublicId) {
      return res.status(400).json({ message: "Image public ID required" });
    }

    await cloudinary.uploader.destroy(imagePublicId);

    return res.json({ message: "Image deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
