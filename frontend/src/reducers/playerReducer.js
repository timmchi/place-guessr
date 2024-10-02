import { createSlice } from "@reduxjs/toolkit";

let initialState = { player: null };

// this will need to be changed once I create a moremature player solution
// there is currently redundancy with the roomPlayer reducer, but lets take a look at it later
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
