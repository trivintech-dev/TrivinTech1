import express from "express";
import {
  listInternships,
  listAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship
} from "../controllers/internship.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

// Public routes
router.get("/", listInternships);

// Admin routes (before /:id so "admin" is not treated as an id)
router.get("/admin/all", requireAuth, requireAdmin, listAllInternships);
router.post("/", requireAuth, requireAdmin, createInternship);
router.put("/:id", requireAuth, requireAdmin, updateInternship);
router.delete("/:id", requireAuth, requireAdmin, deleteInternship);

router.get("/:id", getInternshipById);

export default router;
