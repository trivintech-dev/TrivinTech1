import { Router } from "express";
import {
    createPricingPlan,
    deletePricingPlan,
    getPricingPlan,
    listPricingPlans,
    listPricingPlansAdmin,
    updatePricingPlan
} from "../controllers/pricingPlan.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", listPricingPlans);
router.get("/admin", requireAuth, requireAdmin, listPricingPlansAdmin);
router.get("/:id", getPricingPlan);
router.post("/", requireAuth, requireAdmin, createPricingPlan);
router.put("/:id", requireAuth, requireAdmin, updatePricingPlan);
router.delete("/:id", requireAuth, requireAdmin, deletePricingPlan);

export default router;