import { Router } from "express";
import { createBooking, listMyBookings } from "../controllers/booking.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/services/:serviceId", requireAuth, createBooking);
router.get("/me", requireAuth, listMyBookings);

export default router;
