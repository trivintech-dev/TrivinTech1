import { Router } from "express";
import {
  createService,
  deleteService,
  getRelatedServices,
  getService,
  listServices,
  updateService
} from "../controllers/service.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", listServices);
router.get("/:id/related", getRelatedServices);
router.get("/:id", getService);

router.post("/", requireAuth, requireAdmin, createService);
router.put("/:id", requireAuth, requireAdmin, updateService);
router.delete("/:id", requireAuth, requireAdmin, deleteService);

export default router;
