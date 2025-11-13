import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PublicLayout = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null; // wait for auth check
  if (authUser) return <Navigate to="/profile" replace />; // redirect logged in user

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
