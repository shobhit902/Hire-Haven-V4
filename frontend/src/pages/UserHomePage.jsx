import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Briefcase, MessageSquare, Star, DollarSign, User } from "lucide-react";

const UserHomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans px-6 md:px-16 py-10">
      {/* 🔹 Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-[#75A5FF]">
              {authUser?.name || "Freelancer"}
            </span>
            
          </h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Manage your work, explore new opportunities, and grow your freelance
            journey.
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/projects" className="btn btn-primary rounded-full px-6">
            Find Work
          </Link>
          <Link to="/projects" className="btn btn-primary rounded-full px-6">
            Post Project
          </Link>
          <Link to="/freelancers" className="btn btn-outline rounded-full px-6">
            Hire Talent
          </Link>
        </div>
      </header>

      {/* 🔹 Dashboard Overview */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 bg-white hover:shadow-sm transition-all">
          <div className="p-3 bg-[#75A5FF]/10 rounded-full">
            <Briefcase className="text-[#75A5FF]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              Active Projects
            </h3>
            <p className="text-gray-500 text-xs">
              Your Projects
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 bg-white hover:shadow-sm transition-all">
          <div className="p-3 bg-[#75A5FF]/10 rounded-full">
            <MessageSquare className="text-[#75A5FF]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              Messages & Chats
            </h3>
            <p className="text-gray-500 text-xs">
              Shows unread chats and notifications
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 bg-white hover:shadow-sm transition-all">
          <div className="p-3 bg-[#75A5FF]/10 rounded-full">
            <DollarSign className="text-[#75A5FF]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Earnings</h3>
            <p className="text-gray-500 text-xs">
              Real-time balance from transactions
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-5 flex items-center gap-4 bg-white hover:shadow-sm transition-all">
          <div className="p-3 bg-[#75A5FF]/10 rounded-full">
            <Star className="text-[#75A5FF]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              Profile Rating
            </h3>
            <p className="text-gray-500 text-xs">
              Reflects average client feedback
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 Suggested Sections */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Continue Where You Left Off
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all bg-white">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Complete Your Profile
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Add your skills, experience, and certifications to attract more
              clients.
            </p>
            <Link
              to="/profile"
              className="text-[#75A5FF] font-medium hover:underline"
            >
              Go to Profile →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all bg-white">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Browse Recommended Projects
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Projects matched to your skill set will appear here soon.
            </p>
            <Link
              to="/projects"
              className="text-[#75A5FF] font-medium hover:underline"
            >
              View Projects →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all bg-white">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Manage Your Proposals
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Track pending bids and accepted offers in real time.
            </p>
            <Link
              to="/projects"
              className="text-[#75A5FF] font-medium hover:underline"
            >
              Manage Proposals →
            </Link>
          </div>
        </div>
      </section>

      {/* 🔹 Future Roadmap */}
      <section className="max-w-6xl mx-auto text-center border-t border-gray-200 pt-20 pb-10">
        <h2 className="text-3xl font-semibold mb-10 uppercase tracking-wide">
          HireHaven Roadmap
        </h2>

        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
          HireHaven is evolving to bring you the best tools and workflows that
          empower both freelancers and clients. Our upcoming milestones include:
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-md transition-all">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="text-lg font-semibold mb-2">
              Integrated Payments
            </h3>
            <p className="text-gray-600 text-sm">
              Secure payments using trusted gateways for smooth project payouts.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-md transition-all">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold mb-2">OAuth Login</h3>
            <p className="text-gray-600 text-sm">
              One-click authentication via Google, GitHub, and LinkedIn.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-md transition-all">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-lg font-semibold mb-2">
              Scalable Infrastructure
            </h3>
            <p className="text-gray-600 text-sm">
              Built on cloud-native architecture for speed, stability, and global
              growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHomePage;
