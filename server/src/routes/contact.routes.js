import express from "express";
import { createContactRequest } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", createContactRequest);

export default router;
