import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async ({ userId, type, description, metadata = {} }) => {
  try {
    return await ActivityLog.create({ user: userId, type, description, metadata });
  } catch (error) {
    console.error("Activity logging failed:", error);
    return null;
  }
};
