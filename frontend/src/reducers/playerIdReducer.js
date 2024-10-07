import { createSlice } from "@reduxjs/toolkit";
import { gameEnded } from "./vsGameReducer";

let initialState = null;

const playerIdSlice = createSlice({
  name: "playerId",
  initialState,
  reducers: {
    playerIdReceived(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameEnded, () => {
      return null;
    });
  },
});

export const { playerIdReceived } = playerIdSlice.actions;

export default playerIdSlice.reducer;
