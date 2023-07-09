import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import axios from "../utilities/axios";
import { useAppDispatch } from "../hooks";
import { getMyProfileAction, logoutAction } from "../store/authSlice";

interface AuthGuardProps {
  children: ReactNode;
}
interface initialAuthStateType {
  isAuthenticated: boolean;
  isInitialised: boolean;
  user: {} | null;
}

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
} as initialAuthStateType;

const isValidToken = (token: string | null) => {
  if (!token) {
    return false;
  }

  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const setSession = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const JWTAuthRedux = ({ children }: AuthGuardProps) => {
  //   const [state, dispatch] = useReducer(reducer, initialAuthState);
  const dispatch = useAppDispatch();
  const initialise = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token && isValidToken(token)) {
        setSession(token);
        dispatch(getMyProfileAction());
      } else {
        dispatch(logoutAction());
      }
    } catch (err) {
      console.error(err);
      dispatch(logoutAction());
    }
  };
  useEffect(() => {
    initialise();
  }, []);

  //   if (!state.isInitialised) {
  //     return <div>Loding...</div>;
  //   }
 
  return <>{children}</>;
};

export default JWTAuthRedux;
