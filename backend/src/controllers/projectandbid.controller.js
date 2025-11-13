import { Project } from "../models/project.model.js";
import { Bid } from "../models/bid.model.js";
import { Invite } from "../models/invite.model.js";
import crypto from "crypto";

// 🟩 Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, skills, budgetMin, budgetMax, type } = req.body;

    if (!title || !description || !skills || !budgetMin || !budgetMax || !type) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const project = new Project({
      title,
      description,
      skills,
      budgetMin,
      budgetMax,
      type,
      createdBy: req.user._id, // logged-in user
    });

    await project.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("createProject Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟩 Get all projects (optional filter)
export const getProjects = async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};

    const projects = await Project.find(query)
      .populate("createdBy", "fullName email profilePic _id")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("getProjects Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟩 Create a new bid
export const createBid = async (req, res) => {
  try {
    const { projectId, freelancerId, amount, proposal, deliveryTime } = req.body;

    if (!projectId || !freelancerId || !amount || !proposal || !deliveryTime) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const project = await Project.findById(projectId);
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    const existingBid = await Bid.findOne({ projectId, freelancerId });
    if (existingBid)
      return res
        .status(400)
        .json({ success: false, message: "Bid already exists" });

    const bid = new Bid({ projectId, freelancerId, amount, proposal, deliveryTime });
    await bid.save();

    return res.status(201).json({
      success: true,
      message: "Bid created successfully",
      bid,
    });
  } catch (error) {
    console.error("createBid Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟩 Get bids for a specific project
export const getBids = async (req, res) => {
  try {
    const { projectId } = req.query;
    if (!projectId)
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });

    const bids = await Bid.find({ projectId }).populate(
      "freelancerId",
      "fullName email profilePic"
    );

    return res.status(200).json({ success: true, bids });
  } catch (error) {
    console.error("getBids Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟩 Create an invite
export const createInvite = async (req, res) => {
  try {
    const { projectId, email, invitedBy, description } = req.body;

    if (!projectId || !email || !invitedBy) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const project = await Project.findById(projectId);
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = Date.now() + 3600000 * 24; // 24 hours

    const invite = new Invite({
      projectId,
      email,
      invitedBy,
      description,
      token,
      expiresAt,
    });
    await invite.save();

    return res.status(201).json({
      success: true,
      message: "Invite created successfully",
      invite,
    });
  } catch (error) {
    console.error("createInvite Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟩 Accept a bid
export const acceptBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid)
      return res.status(404).json({ success: false, message: "Bid not found" });

    const project = await Project.findById(bid.projectId);
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    // Only project owner can accept
    if (String(project.createdBy) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    bid.status = "accepted";
    await bid.save();

    await Bid.updateMany(
      { projectId: bid.projectId, _id: { $ne: bidId } },
      { $set: { status: "rejected" } }
    );

    const updatedProject = await Project.findByIdAndUpdate(
      bid.projectId,
      {
        $set: {
          assignedFreelancer: bid.freelancerId,
          status: "in progress",
        },
      },
      { new: true }
    )
      .populate("createdBy", "fullName email profilePic")
      .populate("assignedFreelancer", "fullName email profilePic");

    return res.status(200).json({
      success: true,
      message: "Bid accepted successfully",
      bid,
      project: updatedProject,
    });
  } catch (error) {
    console.error("acceptBid Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟩 Decline a bid
export const declineBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid)
      return res.status(404).json({ success: false, message: "Bid not found" });

    const project = await Project.findById(bid.projectId);
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    if (String(project.createdBy) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    bid.status = "rejected";
    await bid.save();

    return res.status(200).json({
      success: true,
      message: "Bid declined successfully",
      bid,
    });
  } catch (error) {
    console.error("declineBid Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟩 Fetch single project with bids — fixed for chat
export const getProjectWithBids = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate("createdBy", "fullName email profilePic _id")
      .populate("assignedFreelancer", "fullName email profilePic _id")
      .select("-__v");

    if (!project)
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });

    const bids = await Bid.find({ projectId: id })
      .populate("freelancerId", "fullName email profilePic _id")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      project,
      bids,
    });
  } catch (error) {
    console.error("getProjectWithBids Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
