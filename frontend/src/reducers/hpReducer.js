import { createSlice, current } from "@reduxjs/toolkit";
import { gameEnded } from "./vsGameReducer";

// 1k for testing, 6k for the real thing
const hpValue = 1000;

let initialState = { player1HP: hpValue, player2HP: hpValue };

const hpSlice = createSlice({
  name: "hp",
  initialState,
  reducers: {
    removedHP(state, action) {
      const { player, amount } = action.payload;

      if (player === "p1") {
        state.player1HP = Math.max(state.player1HP - amount, 0);
      }

      if (player === "p2") {
        state.player2HP = Math.max(state.player2HP - amount, 0);
      }
    },
    resetHP(state) {
      state.player1HP = hpValue;
      state.player2HP = hpValue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameEnded, (state) => {
      state.player1HP = hpValue;
      state.player2HP = hpValue;
    });
  },
});

export const { removedHP, resetHP } = hpSlice.actions;

export default hpSlice.reducer;
