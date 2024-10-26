//import { useAuth } from "@/constants/AuthContext";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const pathname = useLocation().pathname;
    const token = localStorage.getItem("token");

    // If user is not authenticated and tries to access a private route, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If user is authenticated and tries to access login, redirect to dashboard
    if (token && pathname === "/login") {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PrivateRoute;
