import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, MessageSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 backdrop-blur-lg">
      <nav className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-20">
        {/* Left Section - Logo */}
        <Link
          to="/"
          className="flex items-center shrink-0 hover:opacity-80 transition-all"
        >
          <h1 className="font-bold text-xl sm:text-2xl tracking-tight text-gray-800">
            Hire<span className="text-[#75A5FF]">Haven</span>
          </h1>
        </Link>

        {/* Middle Section - Search */}
        <div className="hidden sm:flex relative flex-1 max-w-md lg:max-w-3xl mx-4 lg:mx-8">
          <svg
            height="20"
            width="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#75A5FF] pointer-events-none"
          >
            <path
              fill="#75A5FF"
              d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75A5FF] focus:border-[#75A5FF]"
          />
        </div>

        {/* Right Section - Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          <NavLink
            to="/projects"
            className="text-gray-700 font-medium hover:text-[#75A5FF] transition whitespace-nowrap"
          >
            Projects
          </NavLink>

          <NavLink
            to="/freelancers"
            className="text-gray-700 font-medium hover:text-[#75A5FF] transition whitespace-nowrap"
          >
            Freelancers
          </NavLink>

          {/* Auth Buttons */}
          {authUser ? (
            <>

              {/* Chat Icon */}
              <button
                onClick={() => navigate("/chats")}
                className="p-2 hover:bg-gray-100 rounded-full transition relative"
                aria-label="Go to chats"
              >
                <MessageSquare className="w-6 h-6 text-gray-700 hover:text-[#75A5FF]" />
              </button>

              {/* Profile */}
              <NavLink to="/profile">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition">
                  <User className="w-5 h-5 text-gray-700" />
                </div>
              </NavLink>

               {/* Settings */}
              <NavLink
                to="/settings"
                className="text-gray-700 font-medium hover:text-[#75A5FF] transition whitespace-nowrap"
              >
                <Settings className="inline w-5 h-5 mr-1" />
                Settings
              </NavLink>

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-700 font-medium hover:text-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="text-gray-700 font-semibold hover:text-white hover:bg-[#75A5FF] border px-6 xl:px-8 py-2 rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all whitespace-nowrap"
            >
              Join
            </NavLink>
          )}
        </div>

        {/* Mobile Right Section */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="sm:hidden p-2 hover:bg-gray-100 rounded-full transition"
          >
            <svg
              height="20"
              width="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#75A5FF]"
            >
              <path
                fill="#75A5FF"
                d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
              />
            </svg>
          </button>

          {/* Chat Icon - Mobile */}
          {authUser && (
            <button
              onClick={() => navigate("/chats")}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Go to chats"
            >
              <MessageSquare className="w-5 h-5 text-gray-700 hover:text-[#75A5FF]" />
            </button>
          )}

          {/* Profile Icon */}
          {authUser && (
            <NavLink to="/profile">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition">
                <User className="w-5 h-5 text-gray-700" />
              </div>
            </NavLink>
          )}

          {/* Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      {showSearch && (
        <div className="sm:hidden px-4 py-3 border-t border-gray-200 bg-white">
          <input
            type="text"
            placeholder="Search projects, freelancers..."
            className="w-full bg-white border border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75A5FF] focus:border-[#75A5FF]"
            autoFocus
          />
        </div>
      )}

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col px-4 py-3 space-y-1">
            <NavLink
              to="/projects"
              className="text-gray-700 font-medium hover:text-[#75A5FF] hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </NavLink>
            <NavLink
              to="/freelancers"
              className="text-gray-700 font-medium hover:text-[#75A5FF] hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Freelancers
            </NavLink>

            {authUser && (
              <>
                <NavLink
                  to="/settings"
                  className="text-gray-700 font-medium hover:text-[#75A5FF] hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-600 font-medium px-4 py-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
