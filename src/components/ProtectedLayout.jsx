import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import DashboardNav from "./DashboardNav";

const ProtectedLayout = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user.user ? (
    <>
      {/* <DashboardNav /> */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedLayout;
