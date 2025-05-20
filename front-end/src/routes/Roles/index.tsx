import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utils/authContext";

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return allowedRoles.includes(user.kind) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RoleBasedRoute;
