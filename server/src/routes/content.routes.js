import { Router } from "express";
import {
  deleteContent,
  deleteContentImage,
  getContentSection,
  getPageContent,
  listAllContent,
  updateContentById,
  uploadContentImage,
  upsertContent
} from "../controllers/content.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.get("/admin/all", requireAuth, requireAdmin, listAllContent);
router.post("/", requireAuth, requireAdmin, upsertContent);
router.put("/:id", requireAuth, requireAdmin, updateContentById);
router.delete("/:id", requireAuth, requireAdmin, deleteContent);
router.post("/upload-image", requireAuth, requireAdmin, upload.single("image"), uploadContentImage);
router.delete("/image/delete", requireAuth, requireAdmin, deleteContentImage);

router.get("/:page/:section", getContentSection);
router.get("/:page", getPageContent);

export default router;
