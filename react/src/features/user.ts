import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/serverapi";

const initialState = {
  isAuth: false,
  loading: false,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ userid, password }: { userid: string; password: string }) => {
    const res = await axiosInstance.post("/auth/login", { userid, password });
    return res.data;
  }
);
export const signup = createAsyncThunk(
  "user/signup",
  async ({ userid, password }: { userid: string; password: string }) => {
    const res = await axiosInstance.post("/auth/signup", { userid, password });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetToken: (state) => {
      state.isAuth = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload.token) {
        alert("Invalid Credentials " + action.payload.message);
        state.loading = false;
      } else {
        localStorage.setItem("token", action.payload.token);
        state.isAuth = true;
        state.loading = false;
      }
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      if (!action.payload.token) {
        alert("Invalid Credentials " + action.payload.message);
        state.loading = false;
      } else {
        localStorage.setItem("token", action.payload.token);
        state.isAuth = true;
        state.loading = false;
      }
    });
  },
});

export default userSlice.reducer;
export const { resetToken } = userSlice.actions;
