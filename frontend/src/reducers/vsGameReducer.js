import { createSlice } from "@reduxjs/toolkit";

// I wonder if the vsGameLocation should also be in here...
let initialState = { vsGameStarted: false, vsRoundEnded: false };

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
  },
});

export const { gameStarted, gameEnded, roundStarted, roundEnded } =
  vsGameSlice.actions;

export default vsGameSlice.reducer;
