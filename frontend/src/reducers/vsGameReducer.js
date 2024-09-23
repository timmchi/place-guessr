import { createSlice, current } from "@reduxjs/toolkit";

// I wonder if the vsGameLocation should also be in here...
let initialState = {
  vsGameStarted: false,
  vsRoundEnded: false,
  vsGameWinner: null,
};

const vsGameSlice = createSlice({
  name: "vsGame",
  initialState,
  reducers: {
    gameStarted(state) {
      state.vsGameStarted = true;
    },
    gameEnded(state) {
      state.vsGameStarted = false;
    },
    roundStarted(state) {
      state.vsRoundEnded = false;
    },
    roundEnded(state) {
      state.vsRoundEnded = true;
    },
    gameWon(state, action) {
      state.vsGameWinner = action.payload;
    },
  },
});

export const { gameStarted, gameEnded, roundStarted, roundEnded, gameWon } =
  vsGameSlice.actions;

export default vsGameSlice.reducer;
