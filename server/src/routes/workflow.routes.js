import { Router } from "express";
import {
    createWorkflowStep,
    deleteWorkflowStep,
    getWorkflowStep,
    listWorkflowSteps,
    updateWorkflowStep
} from "../controllers/workflow.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", listWorkflowSteps);
router.get("/:id", getWorkflowStep);
router.post("/", requireAuth, requireAdmin, createWorkflowStep);
router.put("/:id", requireAuth, requireAdmin, updateWorkflowStep);
router.delete("/:id", requireAuth, requireAdmin, deleteWorkflowStep);

export default router;