import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    response: { type: String, trim: true },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "responded"], default: "open" }
  },
  { timestamps: true }
);

export default mongoose.model("Query", querySchema);
