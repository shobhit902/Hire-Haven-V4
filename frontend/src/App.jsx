import { useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Loader } from "lucide-react";

import PublicLayout from "./layout/PublicLayout";
import PrivateLayout from "./layout/PrivateLayout";
import Public from "./layout/EveryOne";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import ChatPage from "./pages/ChatPage";
import ProjectListPage from "./pages/ProjectListPage";
import FreelancerPage from "./pages/FreelancerPage";

import { useAuthStore } from "./store/useAuthStore";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Final Router Configuration
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Public />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/freelancers" element={<FreelancerPage />} />
          <Route path="/profile/:id" element={<PublicProfilePage />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
