import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    eligibility: {
      type: String,
      required: true
    },
    stipend: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);
