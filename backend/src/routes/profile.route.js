import express from "express";

import { deleteProfile, getProfile, updateProfile, getPublicProfile, getAllUsers } from "../controllers/profile.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", protectRoute, getProfile);
router.put("/update-profile", protectRoute, updateProfile);
router.delete("/profile", protectRoute, deleteProfile);

router.get("/profile/:id", getPublicProfile);

router.get("/all-users", getAllUsers);

export default router;
