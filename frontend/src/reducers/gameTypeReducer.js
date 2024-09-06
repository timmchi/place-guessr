import { createSlice } from "@reduxjs/toolkit";

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
});

export const { vsGameChosen, singleGameChosen, gameTypeReset } =
  gameTypeSlice.actions;

export default gameTypeSlice.reducer;
