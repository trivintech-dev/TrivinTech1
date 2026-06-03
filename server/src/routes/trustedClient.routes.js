import { Router } from "express";
import {
    createTrustedClient,
    deleteTrustedClient,
    getTrustedClient,
    listTrustedClients,
    updateTrustedClient
} from "../controllers/trustedClient.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", listTrustedClients);
router.get("/:id", getTrustedClient);
router.post("/", requireAuth, requireAdmin, createTrustedClient);
router.put("/:id", requireAuth, requireAdmin, updateTrustedClient);
router.delete("/:id", requireAuth, requireAdmin, deleteTrustedClient);

export default router;