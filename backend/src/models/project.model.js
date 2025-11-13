import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    skills: {
      type: [String],
      required: true,
      index: true,
    },
    budgetMin: {
      type: Number,
      required: true,
    },
    budgetMax: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["web", "mobile", "design", "writing", "data", "other"],
      required: true,
      index: true,
      default: "other",
    },
    status: {
      type: String,
      enum: ["open", "in progress", "completed", "closed"],
      default: "open",
      index: true,
    },
    // Optional: to track who posted it (client or freelancer)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null means open/public project
    },
    // Optional: freelancers can apply (proposal system)
    proposals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
    // Optional: if project is assigned to a freelancer
    assignedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
