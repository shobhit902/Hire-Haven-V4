import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import PublicHomePage from "./PublicHomePage";
import UserHomePage from "./UserHomePage";

const HomePage = () => {
  const { authUser } = useAuthStore();

  return authUser ? <UserHomePage /> : <PublicHomePage />;
};

export default HomePage;
