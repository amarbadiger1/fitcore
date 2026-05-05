import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const onBoarding = localStorage.getItem("onBoarding") === "true" || false;

  // ✅ Not logged in → allow access
  if (!token) {
    return <Outlet />;
  }

  // ✅ Logged in but NOT onboarded
  if (onBoarding) {
    return <Navigate to="/onboarding" replace />;
  }

  // ✅ Logged in + onboarded
  return <Navigate to="/dashboard" replace />;
};

export default PublicRoute;