import { Router } from "express";
import {
  applyForJob,
  createJob,
  deleteJob,
  getJob,
  listJobs,
  listMyApplications,
  updateJob
} from "../controllers/job.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", listJobs);
router.get("/me/applications", requireAuth, listMyApplications);
router.get("/:id", getJob);

router.post("/:id/apply", requireAuth, applyForJob);
router.post("/", requireAuth, requireAdmin, createJob);
router.put("/:id", requireAuth, requireAdmin, updateJob);
router.delete("/:id", requireAuth, requireAdmin, deleteJob);

export default router;
