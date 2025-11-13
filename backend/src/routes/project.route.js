import express from "express";
import {
  createProject,
  getProjects,
  getProjectWithBids,
  createBid,
  getBids,
  acceptBid,
  declineBid,
  createInvite,
} from "../controllers/projectandbid.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================================
PROJECT ROUTES
================================ */
router.post("/", protectRoute, createProject); // Create new project
router.get("/", getProjects); // Get all projects
router.get("/:id", getProjectWithBids); // Get single project with all bids

/* ================================
BID ROUTES
================================ */
router.post("/bids", protectRoute, createBid); // Create bid on project
router.get("/bids", getBids); // Get all bids for project (via query)
router.put("/bids/:bidId/accept", protectRoute, acceptBid); // Accept bid
router.put("/bids/:bidId/decline", protectRoute, declineBid); // Decline bid

/* ================================
INVITE ROUTES
================================ */
router.post("/invites", protectRoute, createInvite); // Create project invite
// router.post("/invites/accept/:token", acceptInvite);
// router.post("/invites/decline/:token", declineInvite);

export default router;
