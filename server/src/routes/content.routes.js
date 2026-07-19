import { Router } from "express";
import {
  deleteContent,
  getContentSection,
  getPageContent,
  listAllContent,
  updateContentById,
  upsertContent
} from "../controllers/content.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/admin/all", requireAuth, requireAdmin, listAllContent);
router.post("/", requireAuth, requireAdmin, upsertContent);
router.put("/:id", requireAuth, requireAdmin, updateContentById);
router.delete("/:id", requireAuth, requireAdmin, deleteContent);

router.get("/:page/:section", getContentSection);
router.get("/:page", getPageContent);

export default router;
