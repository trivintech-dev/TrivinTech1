import { Router } from "express";
import multer from "multer";
import {
    createPortfolio,
    deletePortfolio,
    deletePortfolioImage,
    getPortfolio,
    listPortfolios,
    updatePortfolio,
    uploadPortfolioImage
} from "../controllers/portfolio.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/", listPortfolios);
router.get("/:id", getPortfolio);

router.post("/", requireAuth, requireAdmin, createPortfolio);
router.post("/upload-image", requireAuth, requireAdmin, upload.single("image"), uploadPortfolioImage);
router.put("/:id", requireAuth, requireAdmin, updatePortfolio);
router.delete("/:id", requireAuth, requireAdmin, deletePortfolio);
router.delete("/image/delete", requireAuth, requireAdmin, deletePortfolioImage);

export default router;
