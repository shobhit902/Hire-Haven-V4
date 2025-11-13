import { useState, useEffect } from "react";
import { Search, Calendar, Grid, List, MessageCircle } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { useNavigate } from "react-router-dom";

const FreelancerPage = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");

  const { authUser } = useAuthStore();
  const { setSelectedUser } = useChatStore();
  const navigate = useNavigate();

  // ✅ Fetch all freelancers
  useEffect(() => {
    fetchFreelancers();
  }, []);

  // ✅ Filter + Sort dynamically
  useEffect(() => {
    filterAndSortFreelancers();
  }, [searchQuery, freelancers, sortBy]);

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users/all-users");
      const usersData = res.data.users || [];

      // remove current logged-in user
      const filteredUsers = authUser
        ? usersData.filter((u) => u._id !== authUser._id)
        : usersData;

      setFreelancers(Array.isArray(filteredUsers) ? filteredUsers : []);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      toast.error("Failed to load freelancers");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortFreelancers = () => {
    let filtered = freelancers;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = freelancers.filter(
        (f) =>
          f.fullName?.toLowerCase().includes(query) ||
          f.bio?.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "alphabetical":
          return (a.fullName || "").localeCompare(b.fullName || "");
        default:
          return 0;
      }
    });

    setFilteredFreelancers(sorted);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });

  // ✅ Navigate to freelancer's public profile page
  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`); // route to PublicProfilePage
  };

  // ✅ Start chat with freelancer
  const handleMessageClick = async (freelancer) => {
    if (!authUser) {
      toast.error("Please log in to start a chat");
      navigate("/login");
      return;
    }

    if (authUser._id === freelancer._id) {
      toast("You can't message yourself");
      return;
    }

    try {
      const res = await axiosInstance.post("/chats/start", {
        receiverId: freelancer._id,
      });

      if (res.data.success) {
        setSelectedUser({
          _id: freelancer._id,
          username: freelancer.fullName,
          profilePicture: freelancer.profilePic,
        });
        navigate(`/chat/${freelancer._id}`);
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#75A5FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600 text-sm uppercase tracking-widest">
            Loading Freelancers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-20 py-16 font-sans">
      {/* HEADER */}
      <header className="text-center border-b border-gray-200 pb-10 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
          Freelancers
        </h1>
        <p className="text-gray-500 mt-4 text-sm uppercase tracking-widest">
          Discover top talent and collaborate efficiently
        </p>
      </header>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search freelancers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-none px-12 py-3 focus:ring-2 focus:ring-[#75A5FF] focus:outline-none bg-white text-gray-800 placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 bg-white text-gray-800 rounded-none px-4 py-2 text-sm uppercase tracking-widest focus:ring-2 focus:ring-[#75A5FF] focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A-Z</option>
          </select>

          <div className="flex border border-gray-300 bg-white">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 ${
                viewMode === "grid"
                  ? "bg-[#75A5FF] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 ${
                viewMode === "list"
                  ? "bg-[#75A5FF] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FREELANCER GRID / LIST */}
      {filteredFreelancers.length === 0 ? (
        <div className="text-center py-20 border-t border-gray-200">
          <h2 className="text-2xl font-semibold uppercase tracking-widest mb-2">
            No Freelancers Found
          </h2>
          <p className="text-gray-500 text-sm uppercase">
            Try adjusting your search or filters
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredFreelancers.map((f) => {
            const isOwn = authUser?._id === f._id;
            return (
              <div
                key={f._id}
                className="border border-gray-300 p-8 text-center hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                {/* Profile Picture */}
                <div className="mb-6">
                  {f.profilePic ? (
                    <img
                      src={
                        f.profilePic.startsWith("http")
                          ? f.profilePic
                          : `http://localhost:5001/${f.profilePic}`
                      }
                      alt={f.fullName}
                      className="w-24 h-24 rounded-full mx-auto object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-2xl font-bold text-gray-600">
                      {f.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xl font-semibold uppercase tracking-tight">
                  {f.fullName}
                </h3>
                <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                  {f.bio || "No bio provided yet."}
                </p>

                <div className="flex items-center justify-center text-gray-400 text-xs mt-5">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  Joined {formatDate(f.createdAt)}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-8 justify-center">
                  <button
                    onClick={() => handleProfileClick(f._id)}
                    className="px-4 py-2 border border-gray-400 text-xs uppercase tracking-widest bg-white hover:bg-gray-100 transition"
                  >
                    Profile
                  </button>

                  {!isOwn ? (
                    <button
                      onClick={() => handleMessageClick(f)}
                      className="px-4 py-2 bg-[#75A5FF] text-white text-xs uppercase tracking-widest hover:bg-[#6593eb] transition flex items-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-200 text-gray-500 text-xs uppercase tracking-widest cursor-not-allowed"
                    >
                      You
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // LIST VIEW
        <div className="divide-y divide-gray-200">
          {filteredFreelancers.map((f) => {
            const isOwn = authUser?._id === f._id;
            return (
              <div
                key={f._id}
                className="flex justify-between items-center py-6 px-2 bg-white"
              >
                <div className="flex items-center gap-6">
                  {f.profilePic ? (
                    <img
                      src={
                        f.profilePic.startsWith("http")
                          ? f.profilePic
                          : `http://localhost:5001/${f.profilePic}`
                      }
                      alt={f.fullName}
                      className="w-14 h-14 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
                      {f.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-semibold uppercase tracking-tight">
                      {f.fullName}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {f.bio || "No bio available"}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Joined {formatDate(f.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleProfileClick(f._id)}
                    className="px-4 py-2 border border-gray-400 text-xs uppercase tracking-widest bg-white hover:bg-gray-100 transition"
                  >
                    View
                  </button>
                  {!isOwn ? (
                    <button
                      onClick={() => handleMessageClick(f)}
                      className="px-4 py-2 bg-[#75A5FF] text-white text-xs uppercase tracking-widest hover:bg-[#6593eb] transition flex items-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" /> Chat
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-200 text-gray-500 text-xs uppercase tracking-widest cursor-not-allowed"
                    >
                      You
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FreelancerPage;
