import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import jwtDecode from "jwt-decode";
// import SplashScreen from "../components/SplashScreen";
import axios from "../utilities/axios";

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

const setSession = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (
  state: any,
  action: {
    type: "INITIALISE" | "LOGIN" | "LOGOUT";
    payload: { isAuthenticated?: boolean; user?: {} | null };
  }
) => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext: React.Context<any> = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthGuardProps) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialise = async () => {
      try {
        const token = window.localStorage.getItem("token");

        if (token && isValidToken(token)) {
          setSession(token);
          // const response = await axios.get('/api/account/me');
          // const { user } = response.data;
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              // user,
            },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <div>Loding...</div>;
  }

  const login = async (email: string, password: string) => {
    console.log("test", email, password);

    const response = await axios.post("/api/v1/login", {
      email,
      password,
      type: "STUDENT",
    });
    const { token, user } = response.data;

    setSession(token);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({
      type: "LOGOUT",
      payload: {
        isAuthenticated: false,
      },
    });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
