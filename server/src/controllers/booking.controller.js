import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export const createBooking = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: "Service not found" });
    }

    const booking = await Booking.create({
      service: service._id,
      user: req.user.id,
      scheduleDate: req.body.scheduleDate,
      notes: req.body.notes
    });

    return res.status(201).json({ booking });
  } catch (error) {
    return next(error);
  }
};

export const listMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("service")
      .sort({ createdAt: -1 });

    return res.json({ bookings });
  } catch (error) {
    return next(error);
  }
};
