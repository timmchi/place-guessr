import { createSlice } from "@reduxjs/toolkit";
import { gameEnded } from "./vsGameReducer";

let initialState = null;

const gameTypeSlice = createSlice({
  name: "gameType",
  initialState,
  reducers: {
    vsGameChosen() {
      return "VS";
    },
    singleGameChosen() {
      return "SINGLE";
    },
    gameTypeReset() {
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameEnded, () => null);
  },
});

export const { vsGameChosen, singleGameChosen, gameTypeReset } =
  gameTypeSlice.actions;

export default gameTypeSlice.reducer;
