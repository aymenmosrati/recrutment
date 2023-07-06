import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axios";
import { Toast } from "../utilities/toast";
import { setSession } from "../utilities/utils";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: {};
}
const initialState: AuthState = {
  isLoading: false,
  error: null,
  user: {},
};

export const loginAction: any = createAsyncThunk(
  "auth/login",
  async (args: any, thunkAPI) => {
    try {
      console.log("response", args);
      const res = await axiosInstance.post(`/api/v1/login`, args);

      if (res.data.statusCode === 200) {
        console.log(res);
        Toast({
          status: "success",
          message: "Login successful",
          toastId: "LoginSuccess",
        });
        setSession(res.data.data.tokens.accessToken);
        // navigate("/Dashboard");
      }
      return res.data;
    } catch (err: any) {
      Toast({
        status: "error",
        message: err.response.data.message,
        toastId: "LoginError",
      });
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
      state.isLoading = true;
      state.error = null;
    },
    [loginAction.fulfilled]: (state: AuthState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [loginAction.rejected]: (state: AuthState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
