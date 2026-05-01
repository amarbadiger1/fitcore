import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // If user is logged in → redirect
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise allow access
  return <Outlet />;
};

export default PublicRoute;