// import { useAuth } from "@/constants/AuthContext";
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user } = useAuth(); // Récupérer l'utilisateur authentifié

//   if (!user) {
//     return <Navigate to="/login" />; // Rediriger vers login si non connecté
//   }

//   return <>{children}</>; // Afficher la page si connecté
// };

// export default ProtectedRoute;
