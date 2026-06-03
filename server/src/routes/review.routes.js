import { Router } from "express";
import {
  createReview,
  listReviewsByService
} from "../controllers/review.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/services/:serviceId", listReviewsByService);
router.post("/services/:serviceId", requireAuth, createReview);

export default router;
