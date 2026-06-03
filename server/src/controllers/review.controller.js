import Review from "../models/Review.js";
import Service from "../models/Service.js";

export const listReviewsByService = async (req, res, next) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate("user", "name avatarUrl")
      .sort({ createdAt: -1 });

    return res.json({ reviews });
  } catch (error) {
    return next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const service = await Service.findById(req.params.serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: "Service not found" });
    }

    const review = await Review.create({
      service: service._id,
      user: req.user.id,
      rating,
      comment
    });

    return res.status(201).json({ review });
  } catch (error) {
    return next(error);
  }
};
