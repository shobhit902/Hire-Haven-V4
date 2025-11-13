import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import {
  ArrowLeft,
  User,
  DollarSign,
  Clock,
  Code2,
  FileText,
  Mail,
  MessageCircle,
} from "lucide-react";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { setSelectedUser } = useChatStore();

  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/projects/${id}`);
      setProject(res.data.project);
      setBids(res.data.bids || []);
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  const handleBidAction = async (bidId, action) => {
    const confirmMsg =
      action === "accept"
        ? "Are you sure you want to accept this bid?"
        : "Are you sure you want to decline this bid?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const url =
        action === "accept"
          ? `/projects/bids/${bidId}/accept`
          : `/projects/bids/${bidId}/decline`;

      await axiosInstance.put(url);
      toast.success(`Bid ${action === "accept" ? "accepted" : "declined"} successfully`);
      fetchProjectDetails();
    } catch (error) {
      console.error("Bid action error:", error);
      toast.error(error.response?.data?.message || "Failed to update bid status");
    }
  };

  // ✅ FIXED: Start Chat with correct user
  const handleStartChat = async (targetUser) => {
    if (!targetUser?._id) return toast.error("User not found");

    if (!authUser?._id) {
      toast.error("Please log in to start chatting");
      navigate("/login");
      return;
    }

    if (authUser._id === targetUser._id) {
      toast("You can't message yourself");
      return;
    }

    try {
      const res = await axiosInstance.post("/chats/start", {
        receiverId: targetUser._id,
      });

      if (res.data.success) {
        const receiver = res.data.receiverUser || targetUser;

        setSelectedUser({
          _id: receiver._id,
          username: receiver.fullName,
          profilePicture: receiver.profilePic,
        });

        navigate(`/chat/${receiver._id}`);
      } else {
        toast.error("Failed to start chat");
      }
    } catch (error) {
      console.error("Chat start error:", error);
      toast.error("Something went wrong while starting chat");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 border-4 border-[#75A5FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-600 uppercase tracking-widest">
            Loading Project Details...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4 text-lg">Project not found</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const isOwner = String(authUser?._id) === String(project.createdBy?._id);

  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 px-6 md:px-20 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-800 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-xl p-8 space-y-10 shadow-lg">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {project.createdBy?.fullName || "Anonymous"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />{" "}
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <section>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-blue-600" /> Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <p className="flex items-center gap-2 font-medium text-sm mb-1 text-gray-700">
              <DollarSign className="w-4 h-4 text-green-600" />
              Budget Range
            </p>
            <p className="text-gray-800 font-semibold">
              ${project.budgetMin} – ${project.budgetMax}
            </p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <p className="flex items-center gap-2 font-medium text-sm mb-1 text-gray-700">
              <Code2 className="w-4 h-4 text-blue-600" />
              Skills Required
            </p>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-xs rounded-full border border-gray-200 text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800">
            <User className="w-5 h-5 text-blue-600" /> Bids ({bids.length})
          </h2>

          {bids.length === 0 ? (
            <p className="text-gray-500 italic text-sm">No bids yet for this project.</p>
          ) : (
            <div className="space-y-4">
              {bids.map((bid) => {
                // ✅ Calculate for EACH bid individually
                const isBidOwner = String(authUser?._id) === String(bid.freelancerId?._id);
                const chatTarget = isBidOwner ? project.createdBy : bid.freelancerId;

                return (
                  <div
                    key={bid._id}
                    className={`p-4 rounded-lg border ${
                      bid.status === "accepted"
                        ? "bg-green-50 border-green-400"
                        : bid.status === "rejected"
                        ? "bg-red-50 border-red-400"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={bid.freelancerId?.profilePic || "/avatar.png"}
                          alt={bid.freelancerId?.fullName}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {bid.freelancerId?.fullName}
                          </p>
                          {bid.freelancerId?.email && (
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {bid.freelancerId.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-green-600 font-semibold">${bid.amount}</p>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-1">
                      {bid.proposal}
                    </p>

                    <p className="text-xs text-gray-500 mb-3">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          bid.status === "accepted"
                            ? "text-green-600"
                            : bid.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {bid.status}
                      </span>
                    </p>

                    {isOwner && bid.status === "pending" && (
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => handleBidAction(bid._id, "accept")}
                          className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleBidAction(bid._id, "decline")}
                          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {/* ✅ FIXED: Use chatTarget which is calculated per bid */}
                    <button
                      onClick={() => handleStartChat(chatTarget)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#75A5FF] hover:bg-[#6593eb] text-white text-xs rounded-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat with {isBidOwner ? "Project Owner" : "Freelancer"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;