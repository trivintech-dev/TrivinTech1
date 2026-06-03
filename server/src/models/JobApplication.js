import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
    status: {
      type: String,
      enum: ["submitted", "review", "shortlisted", "rejected", "hired"],
      default: "submitted"
    }
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
