import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { getFirebaseAdmin } from "../config/firebaseAdmin.js";
import { logActivity } from "../utils/activity.js";

const buildUserPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatarUrl || null,
  phone: user.phone || null,
  dateOfBirth: user.dateOfBirth || null,
  gender: user.gender || null,
  address: user.address || null,
  city: user.city || null,
  state: user.state || null,
  country: user.country || null,
  zipCode: user.zipCode || null,
  timezone: user.timezone || "UTC",
  language: user.language || "English",
  notificationSettings: user.notificationSettings || { email: true, sms: false, push: false },
  accountStatus: user.accountStatus || "active",
  membershipPlan: user.membershipPlan || "Basic",
  joinDate: user.createdAt,
  provider: user.provider
});

const ensureAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin credentials are missing");
  }

  let adminUser = await User.findOne({ email });

  if (!adminUser) {
    adminUser = await User.create({
      name: "Admin",
      email,
      password,
      role: "admin",
      provider: "local"
    });
  } else if (adminUser.role !== "admin") {
    adminUser.role = "admin";
    adminUser.password = password;
    await adminUser.save();
  }

  return adminUser;
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (email === process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Admin email is reserved" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered. Please login or use a different email." });
    }

    const user = await User.create({ name, email, password, provider: "local" });
    const token = signToken({ id: user._id, role: user.role, email: user.email });

    await logActivity({
      userId: user._id,
      type: "registration",
      description: "User registered successfully",
      metadata: {
        userAgent: req.headers["user-agent"] || null,
        ip: req.ip || null
      }
    });

    return res.status(201).json({ token, user: buildUserPayload(user) });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const adminUser = await ensureAdminUser();
      const token = signToken({ id: adminUser._id, role: adminUser.role, email });
      return res.json({ token, user: buildUserPayload(adminUser) });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({ id: user._id, role: user.role, email: user.email });
    await logActivity({
      userId: user._id,
      type: "login",
      description: "User signed in successfully",
      metadata: {
        userAgent: req.headers["user-agent"] || null,
        ip: req.ip || null
      }
    });
    return res.json({ token, user: buildUserPayload(user) });
  } catch (error) {
    return next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Missing Google token" });
    }

    const firebaseAdmin = getFirebaseAdmin();
    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);

    const email = decoded.email;
    if (!email) {
      return res.status(400).json({ message: "Google account missing email" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: decoded.name || "Google User",
        email,
        provider: "google",
        avatarUrl: decoded.picture
      });
    }

    const token = signToken({ id: user._id, role: user.role, email: user.email });
    await logActivity({
      userId: user._id,
      type: "google_login",
      description: "User signed in with Google",
      metadata: {
        userAgent: req.headers["user-agent"] || null,
        ip: req.ip || null
      }
    });
    return res.json({ token, user: buildUserPayload(user) });
  } catch (error) {
    return next(error);
  }
};

export const otpRequest = async (_req, res) => {
  return res.status(501).json({ message: "OTP provider not configured" });
};

export const otpVerify = async (_req, res) => {
  return res.status(501).json({ message: "OTP provider not configured" });
};
