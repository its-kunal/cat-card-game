import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/serverapi";

enum Cards {
  CAT = "CAT",
  DEFUSE = "DEFUSE",
  SHUFFLE = "SHUFFLE",
  EXPLODE = "EXPLODE",
  HIDDEN = "HIDDEN",
}

const initialState = {
  cardLen: 5,
  currentCard: Cards.EXPLODE,
  message: "",
};

export const resetGame = createAsyncThunk("game/reset", async () => {
  const res = await axiosInstance.get("/game/reset");
  return res.data;
});

export const startGame = createAsyncThunk("game/newgame", async () => {
  const res = await axiosInstance.get("/game/start");
  return res.data;
});

export const popCard = createAsyncThunk("game/pop", async () => {
  const res = await axiosInstance.get("/game/pop");
  return res.data;
});

export const endGame = createAsyncThunk("game/end", async () => {});

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(resetGame.fulfilled, (state, action) => {
      state.cardLen = action.payload.cardLen;
      state.currentCard = Cards.HIDDEN;
      if (action.payload.message) state.message = action.payload.message;
    });
    builder.addCase(startGame.fulfilled, (state, action) => {
      if (action.payload.cardLen) state.cardLen = action.payload.cardLen;
      if (action.payload.message) state.message = action.payload.message;
      state.currentCard = Cards.HIDDEN;
    });
    builder.addCase(popCard.fulfilled, (state, action) => {
      if (action.payload.card) {
        state.currentCard = action.payload.card;
      }
      state.cardLen = action.payload.cardLen;
      if (action.payload.message) state.message = action.payload.message;
    });
  },
});

export default gameSlice.reducer;
export const { reset } = gameSlice.actions;
