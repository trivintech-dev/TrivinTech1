import express from "express";
import {
  createQuery,
  listMyQueries,
  listAllQueries,
  respondToQuery
} from "../controllers/query.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

router.post("/", requireAuth, createQuery);
router.get("/me", requireAuth, listMyQueries);
router.get("/", requireAuth, requireAdmin, listAllQueries);
router.post("/:id/response", requireAuth, requireAdmin, respondToQuery);

export default router;
