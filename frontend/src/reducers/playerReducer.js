import { createSlice } from "@reduxjs/toolkit";

let initialState = { player: null };

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    roomCreated(state) {
      state.player = "p1";
    },
    roomJoined(state) {
      state.player = "p2";
    },
  },
});

export const { roomCreated, roomJoined } = playerSlice.actions;

export default playerSlice.reducer;
