import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/siteSetting.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", getSettings);
router.put("/", requireAuth, requireAdmin, updateSettings);

export default router;
