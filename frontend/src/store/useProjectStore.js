import { create } from "zustand";
import { axiosInstance as axios } from "../lib/axios";
import toast from "react-hot-toast";

export const useProjectStore = create((set, get) => ({
  projects: [],
  bids: [],
  invites: [],
  isLoading: false,
  error: null,

  // --- GET PROJECTS ---
  getProjects: async (type = "") => {
    try {
      set({ isLoading: true, error: null });
      const query = type ? `?type=${type}` : "";
      const res = await axios.get(`/projects${query}`);
      set({ projects: res.data.projects || [], isLoading: false });
    } catch (err) {
      console.error("❌ getProjects Error:", err);
      toast.error("Failed to fetch projects");
      set({ isLoading: false, error: err.message });
    }
  },

  // --- CREATE PROJECT ---
  createProject: async (projectData) => {
    try {
      set({ isLoading: true });
      const res = await axios.post("/projects", projectData);
      set((state) => ({
        projects: [res.data.project, ...state.projects],
        isLoading: false,
      }));
      toast.success("Project created successfully");
    } catch (err) {
      console.error("❌ createProject Error:", err);
      toast.error(err.response?.data?.message || "Failed to create project");
      set({ isLoading: false });
    }
  },

  // --- CREATE BID ---
  createBid: async (bidData) => {
    console.log("🏪 Store createBid called with:", bidData);
    try {
      set({ isLoading: true });
      
      // Log the exact request being made
      console.log("📡 Making POST request to /projects/bids");
      console.log("📦 Request payload:", JSON.stringify(bidData, null, 2));
      
      const res = await axios.post("/projects/bids", bidData);
      
      console.log("✅ Server response:", res.data);
      toast.success("Bid submitted successfully");
      set({ isLoading: false });
      return res.data.bid;
    } catch (err) {
      console.error("❌ createBid Error:", err);
      console.error("❌ Error response:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);
      console.error("❌ Error message:", err.message);
      
      const errorMessage = err.response?.data?.message || err.message || "Failed to submit bid";
      toast.error(errorMessage);
      set({ isLoading: false });
      throw err; // Re-throw so BidModal can catch it
    }
  },

  // --- GET BIDS ---
  getBids: async (projectId) => {
    try {
      set({ isLoading: true });
      const res = await axios.get(`/projects/bids?projectId=${projectId}`);
      set({ bids: res.data.bids || [], isLoading: false });
    } catch (err) {
      console.error("❌ getBids Error:", err);
      toast.error("Failed to fetch bids");
      set({ isLoading: false });
    }
  },

  // --- CREATE INVITE ---
  createInvite: async (inviteData) => {
    try {
      set({ isLoading: true });
      const res = await axios.post("/projects/invites", inviteData);
      set((state) => ({
        invites: [...state.invites, res.data.invite],
        isLoading: false,
      }));
      toast.success("Invite sent successfully");
    } catch (err) {
      console.error("❌ createInvite Error:", err);
      toast.error(err.response?.data?.message || "Failed to send invite");
      set({ isLoading: false });
    }
  },

  // --- ACCEPT INVITE ---
  acceptInvite: async (token) => {
    try {
      set({ isLoading: true });
      const res = await axios.post(`/projects/invites/accept/${token}`);
      toast.success("Invite accepted successfully");
      set((state) => ({
        invites: state.invites.map((i) =>
          i.token === token ? { ...i, status: "accepted" } : i
        ),
        isLoading: false,
      }));
      return res.data.invite;
    } catch (err) {
      console.error("❌ acceptInvite Error:", err);
      toast.error(err.response?.data?.message || "Failed to accept invite");
      set({ isLoading: false });
    }
  },

  // --- DECLINE INVITE ---
  declineInvite: async (token) => {
    try {
      set({ isLoading: true });
      const res = await axios.post(`/projects/invites/decline/${token}`);
      toast.success("Invite declined successfully");
      set((state) => ({
        invites: state.invites.map((i) =>
          i.token === token ? { ...i, status: "declined" } : i
        ),
        isLoading: false,
      }));
      return res.data.invite;
    } catch (err) {
      console.error("❌ declineInvite Error:", err);
      toast.error(err.response?.data?.message || "Failed to decline invite");
      set({ isLoading: false });
    }
  },
}));