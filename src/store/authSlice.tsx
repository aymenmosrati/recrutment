import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
export const loginAction = createAsyncThunk(
  "auth/login",
  async (args, thunkAPI) => {
    const { formData } = args;
    try {
      const res = await axiosInstance.post(`api/v1/login`, {
        formData,
        type: "STUDENT",
      });
      if (res.data.statusCode === 200) {
        Toast({
          status: "success",
          message: "Login successful",
          toastId: "LoginSuccess",
        });
        setSession(res.data.data.tokens.accessToken);
      }
    } catch (err: any) {
      console.log("err failer", err);
      Toast({
        status: "error",
        message: err.response.data.message,
        toastId: "LoginError",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {},
  extraReducers: {
    [loginAction.pending]: (state, action:PayloadAction<any>    ) => {
      state.isLoading = true;
      state.error = null;
    },
    [loginAction.fulfilled]: (state, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.quizzes = action.payload;
    },
    [loginAction.rejected]: (state, action:PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;