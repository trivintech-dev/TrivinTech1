import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    scheduleDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
