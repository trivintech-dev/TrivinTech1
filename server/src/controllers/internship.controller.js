import Internship from "../models/Internship.js";

export const listInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find({ isActive: true })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name");

    return res.json({ internships });
  } catch (error) {
    return next(error);
  }
};

export const listAllInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name");

    return res.json({ internships });
  } catch (error) {
    return next(error);
  }
};

export const getInternshipById = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate("createdBy", "name");

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    return res.json({ internship });
  } catch (error) {
    return next(error);
  }
};

export const createInternship = async (req, res, next) => {
  try {
    const { role, duration, eligibility, stipend, description } = req.body;

    if (!role || !duration || !eligibility || !stipend) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const internship = new Internship({
      role,
      duration,
      eligibility,
      stipend,
      description: description || "",
      createdBy: req.user._id
    });

    await internship.save();
    return res.status(201).json({ internship });
  } catch (error) {
    return next(error);
  }
};

export const updateInternship = async (req, res, next) => {
  try {
    const { role, duration, eligibility, stipend, description, isActive } = req.body;

    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { role, duration, eligibility, stipend, description, isActive },
      { new: true }
    );

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    return res.json({ internship });
  } catch (error) {
    return next(error);
  }
};

export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    return res.json({ message: "Internship deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
