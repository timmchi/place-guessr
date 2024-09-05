import { createSlice } from "@reduxjs/toolkit";

let initialState = { player: null };

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    roomWasCreated(state) {
      state.player = "p1";
    },
    roomWasJoined(state) {
      state.player = "p2";
    },
  },
});

export const { roomWasCreated, roomWasJoined } = playerSlice.actions;

export default playerSlice.reducer;
