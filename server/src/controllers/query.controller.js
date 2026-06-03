import Query from "../models/Query.js";
import User from "../models/User.js";

export const createQuery = async (req, res, next) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    const query = await Query.create({
      user: req.user.id,
      subject,
      message
    });

    return res.status(201).json({ query });
  } catch (error) {
    return next(error);
  }
};

export const listMyQueries = async (req, res, next) => {
  try {
    const queries = await Query.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json({ queries });
  } catch (error) {
    return next(error);
  }
};

export const listAllQueries = async (req, res, next) => {
  try {
    const queries = await Query.find().populate("user", "name email").sort({ createdAt: -1 });
    return res.json({ queries });
  } catch (error) {
    return next(error);
  }
};

export const respondToQuery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    if (!response) return res.status(400).json({ message: "Response required" });

    const query = await Query.findById(id);
    if (!query) return res.status(404).json({ message: "Query not found" });

    query.response = response;
    query.respondedBy = req.user.id;
    query.status = "responded";
    await query.save();

    return res.json({ query });
  } catch (error) {
    return next(error);
  }
};
