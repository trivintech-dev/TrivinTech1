import express from "express";
import {
  listTestimonials,
  listAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadTestimonialImage,
  deleteTestimonialImage
} from "../controllers/testimonial.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// Public routes
router.get("/", listTestimonials);
router.get("/:id", getTestimonialById);

// Admin routes
router.get("/admin/all", requireAuth, requireAdmin, listAllTestimonials);
router.post("/", requireAuth, requireAdmin, createTestimonial);
router.put("/:id", requireAuth, requireAdmin, updateTestimonial);
router.delete("/:id", requireAuth, requireAdmin, deleteTestimonial);
router.post("/upload-image", requireAuth, requireAdmin, upload.single("image"), uploadTestimonialImage);
router.delete("/image/delete", requireAuth, requireAdmin, deleteTestimonialImage);

export default router;
