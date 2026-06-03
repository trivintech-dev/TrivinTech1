import { Router } from "express";
import {
  googleLogin,
  login,
  otpRequest,
  otpVerify,
  register
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/otp/request", otpRequest);
router.post("/otp/verify", otpVerify);

export default router;
