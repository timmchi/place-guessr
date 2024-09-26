import { createSlice, current } from "@reduxjs/toolkit";

// 1k for testing, 6k for the real thing
const hpValue = 6000;

let initialState = [
  { player1: { id: 1, hp: hpValue } },
  { player2: { id: 2, hp: hpValue } },
];

const hpSlice = createSlice({
  name: "hp",
  initialState,
  reducers: {
    removedHP(state, action) {
      const { player, amount } = action.payload;

      if (player === "p1") {
        state[0].player1.hp = Math.max(state[0].player1.hp - amount, 0);
      }

      if (player === "p2") {
        state[1].player2.hp = Math.max(state[1].player2.hp - amount, 0);
      }
    },
    resetHP(state) {
      state[0].player1.hp = hpValue;
      state[1].player2.hp = hpValue;
    },
  },
});

export const { removedHP, resetHP } = hpSlice.actions;

export default hpSlice.reducer;
