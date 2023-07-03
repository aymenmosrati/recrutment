import React, { ReactNode } from "react";
import { Navigate } from "react-router";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
