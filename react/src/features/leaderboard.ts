import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/serverapi";

const initialState: { leaderboard: unknown } = {
  leaderboard: [],
};

export const getLeaderboard = createAsyncThunk("leaderboard/get", async () => {
  const res = await axiosInstance.get("/leaderboard");
  const leaderboardArr = [];
  const givenArr: [] = res.data.leaderboard;

  while (givenArr.length) {
    leaderboardArr.push(givenArr.splice(0, 2));
  }
  // return Object.fromEntries(leaderboardArr)
  return leaderboardArr;
});

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderboard.fulfilled, (state, action) => {
      console.log(action.payload);
      state.leaderboard = action.payload;
    });
  },
});

export default leaderboardSlice.reducer;
// export const {  } = leaderboardSlice.actions;
