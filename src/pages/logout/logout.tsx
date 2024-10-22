import { useAuth } from "@/constants/AuthContext";
import React from "react";


const Logout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // Rediriger après déconnexion
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
