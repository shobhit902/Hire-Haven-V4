import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Camera, Mail, User, FileText, ArrowLeft } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";

const PublicProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/users/profile/${id}`);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">User not found</p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const isOwnProfile = authUser?._id === user._id;

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-10">
      <div className="max-w-2xl mx-auto bg-base-300 rounded-xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            {isOwnProfile ? "Your Profile" : `${user.fullName}'s Profile`}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Viewing {isOwnProfile ? "your" : "public"} profile
          </p>
        </div>

        {/* Profile picture */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={user.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 border-base-content"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {user.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {user.email}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Bio
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border text-sm text-zinc-300">
              {user.bio || (
                <span className="italic text-zinc-500">No bio added yet.</span>
              )}
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-base-200 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{user.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
