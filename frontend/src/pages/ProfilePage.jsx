import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, FileText, Edit3 } from "lucide-react";
import toast from "react-hot-toast"; // ✅ optional toast feedback

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, setAuthUser } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [bio, setBio] = useState(authUser?.bio || "");
  const [isEditingBio, setIsEditingBio] = useState(false);

  // ✅ Handle profile picture upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      const res = await updateProfile({ profilePic: base64Image });

      // ✅ instantly update frontend state
      if (res?.user) setAuthUser(res.user);
      toast.success("Profile picture updated!");
    };
  };

  // ✅ Handle bio update
  const handleBioSave = async () => {
    if (bio.trim() !== authUser?.bio) {
      const res = await updateProfile({ bio });
      if (res?.user) setAuthUser(res.user);
      toast.success("Bio updated successfully!");
    }
    setIsEditingBio(false);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>

          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-content/20"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/70">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
                {authUser?.fullName || "—"}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
                {authUser?.email || "—"}
              </p>
            </div>

            {/* ✅ Bio Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm text-base-content/70">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Bio
                </div>

                {!isEditingBio && (
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="btn btn-xs btn-ghost flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {isEditingBio ? (
                <div className="flex flex-col gap-3">
                  <textarea
                    className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 resize-none text-base-content"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write something about yourself..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleBioSave}
                      disabled={isUpdatingProfile}
                      className="btn btn-sm btn-primary"
                    >
                      {isUpdatingProfile ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setBio(authUser.bio || "");
                        setIsEditingBio(false);
                      }}
                      className="btn btn-sm btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 text-base-content/90">
                  {bio ? (
                    <p>{bio}</p>
                  ) : (
                    <span className="text-base-content/60 italic">
                      No bio added yet.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-300">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0] || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
