import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createOrGetChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/start", protectRoute, createOrGetChat);

export default router;
