import { createSlice, current } from "@reduxjs/toolkit";

let initialState = [
  { player1: { id: 1, hp: 5000 } },
  { player2: { id: 2, hp: 5000 } },
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
  },
});

export const { removedHP } = hpSlice.actions;

export default hpSlice.reducer;
