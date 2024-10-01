import { createSlice } from "@reduxjs/toolkit";

let initialState = { player1RoundDistance: 0, player2RoundDistance: 0 };

const roundDistanceSlice = createSlice({
  name: "roundDistance",
  initialState,
  reducers: {
    roundDistanceReceived(state, action) {
      const { player1Distance, player2Distance } = action.payload;

      state.player1RoundDistance = player1Distance;
      state.player2RoundDistance = player2Distance;
    },
    roundDistanceReset(state) {
      state.player1RoundDistance = 0;
      state.player2RoundDistance = 0;
    },
  },
});

export const { roundDistanceReceived, roundDistanceReset } =
  roundDistanceSlice.actions;

export default roundDistanceSlice.reducer;
