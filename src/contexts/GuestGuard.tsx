import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAppSelector } from "../hooks";

// ----------------------------------------------------------------------

type TypeGuestGuard = {
  children: ReactNode;
};

export default function GuestGuard({ children }: TypeGuestGuard) {
  // const { isAuthenticated, isInitialised } = useAuth();
  const { isAuthenticated } = useAppSelector((state: any) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/Dashboard" />;
  }

  // if (!isInitialised) {
  //   return <LoadingScreen />;
  // }

  return <> {children} </>;
}
