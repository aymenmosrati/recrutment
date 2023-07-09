import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAppSelector } from "../hooks";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  // const { isAuthenticated } = useAuth();
  const { isAuthenticated } = useAppSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AuthGuard;
