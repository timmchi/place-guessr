import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  { player1: { id: 1, distance: 0 } },
  { player2: { id: 2, distance: 0 } },
];

const roundDistanceSlice = createSlice({
  name: "roundDistance",
  initialState,
  reducers: {
    roundDistanceReceived(state, action) {
      const { player1Distance, player2Distance } = action.payload;

      state[0].player1.distance = player1Distance;
      state[1].player2.distance = player2Distance;
    },
    roundDistanceReset(state) {
      state[0].player1.distance = 0;
      state[1].player2.distance = 0;
    },
  },
});

export const { roundDistanceReceived, roundDistanceReset } =
  roundDistanceSlice.actions;

export default roundDistanceSlice.reducer;
