import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/axios";
import { Toast } from "../utilities/toast";
import { setSession } from "../contexts/JWTAuthRedux";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialised: boolean;
  user: {} | null;
}
const initialState: AuthState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

export const loginAction: any = createAsyncThunk(
  "auth/login",
  async (args: any, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/api/v1/login`, args);
      if (res.data.statusCode === 200) {
        setSession(res.data.data.tokens.accessToken);
        return res.data;
      }
    } catch (err: any) {
      throw err.response.data;
    }
  }
);
export const logoutAction: any = createAsyncThunk(
  "auth/logout",
  async (args: any, thunkAPI) => {
    setSession(null);
  }
);

export const getMyProfileAction: any = createAsyncThunk(
  "auth/Profile",
  async (args: any, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/api/v1/profile/my`, args);
      if (res.data.statusCode === 200) {
        setSession(res.data.data.tokens.accessToken);
      }
      return res.data;
    } catch (err: any) {
      throw err.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginAction.pending]: (state: AuthState) => {
      state.error = null;
      state.isAuthenticated = false;
      state.isInitialised = false;
      state.user = null;
    },
    [loginAction.fulfilled]: (state: AuthState, action: PayloadAction<any>) => {
      state.error = null;
      state.isAuthenticated = true;
      state.isInitialised = false;
      state.user = action.payload;
    },
    [loginAction.rejected]: (state: AuthState, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isInitialised = false;
      state.user = null;
    },
    [logoutAction.pending]: (state: AuthState) => {
      state.isLoading = true;
      state.error = null;
    },
    [logoutAction.fulfilled]: (
      state: AuthState,
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    [logoutAction.rejected]: (state: AuthState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getMyProfileAction.pending]: (state: AuthState) => {
      state.isLoading = true;
      state.isAuthenticated = true;
      state.error = null;
    },
    [getMyProfileAction.fulfilled]: (
      state: AuthState,
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [getMyProfileAction.rejected]: (
      state: AuthState,
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
