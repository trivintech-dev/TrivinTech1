import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

export const listJobs = async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { isActive: true };
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    return res.json({ jobs });
  } catch (error) {
    return next(error);
  }
};

export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ job });
  } catch (error) {
    return next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, createdBy: req.user.id });
    return res.status(201).json({ job });
  } catch (error) {
    return next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ job });
  } catch (error) {
    return next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ message: "Job deleted" });
  } catch (error) {
    return next(error);
  }
};

export const applyForJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existing = await JobApplication.findOne({
      job: job._id,
      user: req.user.id
    });

    if (existing) {
      return res.status(409).json({ message: "Already applied" });
    }

    const application = await JobApplication.create({
      job: job._id,
      user: req.user.id,
      coverLetter: req.body.coverLetter,
      resumeUrl: req.body.resumeUrl
    });

    return res.status(201).json({ application });
  } catch (error) {
    return next(error);
  }
};

export const listMyApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find({ user: req.user.id })
      .populate("job")
      .sort({ createdAt: -1 });

    return res.json({ applications });
  } catch (error) {
    return next(error);
  }
};
