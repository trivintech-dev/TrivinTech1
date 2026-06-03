import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";
import { logActivity } from "../utils/activity.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      avatarUrl,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      country,
      zipCode,
      timezone,
      language,
      notificationSettings
    } = req.body;

    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existing) {
        return res.status(409).json({ message: "Email already registered" });
      }
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;
    if (dateOfBirth !== undefined) updates.dateOfBirth = dateOfBirth;
    if (gender !== undefined) updates.gender = gender;
    if (address !== undefined) updates.address = address;
    if (city !== undefined) updates.city = city;
    if (state !== undefined) updates.state = state;
    if (country !== undefined) updates.country = country;
    if (zipCode !== undefined) updates.zipCode = zipCode;
    if (timezone !== undefined) updates.timezone = timezone;
    if (language !== undefined) updates.language = language;
    if (notificationSettings !== undefined) updates.notificationSettings = notificationSettings;

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await logActivity({
      userId: user._id,
      type: "profile_update",
      description: "Profile information updated",
      metadata: {
        fields: Object.keys(updates),
        userAgent: req.headers["user-agent"] || null,
        ip: req.ip || null
      }
    });

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.password) {
      return res.status(400).json({ message: "Password change is not available for this account" });
    }

    const isValid = await user.comparePassword(currentPassword);
    if (!isValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    await logActivity({
      userId: user._id,
      type: "password_change",
      description: "Password changed successfully",
      metadata: {
        userAgent: req.headers["user-agent"] || null,
        ip: req.ip || null
      }
    });

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    return next(error);
  }
};

export const getActivityTimeline = async (req, res, next) => {
  try {
    const activities = await ActivityLog.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.json({ activities });
  } catch (error) {
    return next(error);
  }
};
