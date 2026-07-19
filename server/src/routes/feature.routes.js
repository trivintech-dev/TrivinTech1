import express from "express";
import {
  listFeatures,
  listAllFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature
} from "../controllers/feature.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

// Public routes
router.get("/", listFeatures);

// Admin routes (before /:id so "admin" is not treated as an id)
router.get("/admin/all", requireAuth, requireAdmin, listAllFeatures);
router.post("/", requireAuth, requireAdmin, createFeature);
router.put("/:id", requireAuth, requireAdmin, updateFeature);
router.delete("/:id", requireAuth, requireAdmin, deleteFeature);

router.get("/:id", getFeatureById);

export default router;
