import express from "express";
import {
    createContactRequest,
    deleteContactRequest,
    listContactRequests,
    listMyContactRequests,
    respondToContactRequest
} from "../controllers/contact.controller.js";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

router.post("/", optionalAuth, createContactRequest);
router.get("/me", requireAuth, listMyContactRequests);
router.get("/", requireAuth, requireAdmin, listContactRequests);
router.post("/:id/response", requireAuth, requireAdmin, respondToContactRequest);
router.delete("/:id", requireAuth, requireAdmin, deleteContactRequest);

export default router;
