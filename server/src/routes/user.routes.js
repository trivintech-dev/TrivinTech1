import { Router } from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
  getActivityTimeline
} from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, getProfile);
router.put("/me", requireAuth, updateProfile);
router.put("/me/password", requireAuth, changePassword);
router.get("/me/activity", requireAuth, getActivityTimeline);

export default router;
