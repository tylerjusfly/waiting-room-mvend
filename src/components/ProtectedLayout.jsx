import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { selectUser } from "../redux/features/authSlice";

const ProtectedLayout = () => {
  const user = useSelector(selectUser);
  const location = useLocation();

  return user.username ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedLayout;
