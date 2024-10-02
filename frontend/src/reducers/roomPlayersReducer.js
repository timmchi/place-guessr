import { createSlice } from "@reduxjs/toolkit";

let initialState = { player1: null, player2: null };

// players in the room to be used in the room lobby, round end, some other things in the future
const roomPlayersSlice = createSlice({
  name: "roomPlayers",
  initialState,
  reducers: {
    firstPlayerJoined(state, action) {
      state.player1 = action.payload;
    },
    secondPlayerJoined(state, action) {
      state.player2 = action.payload;
    },
    roomPlayersReset(state) {
      state.player1 = null;
      state.player2 = null;
    },
  },
});

export const { firstPlayerJoined, secondPlayerJoined, roomPlayersReset } =
  roomPlayersSlice.actions;

export default roomPlayersSlice.reducer;
