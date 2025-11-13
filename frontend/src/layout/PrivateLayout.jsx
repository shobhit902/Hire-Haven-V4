import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const PrivateLayout = () => {
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();

  // Redirect to login if not authenticated
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default PrivateLayout;