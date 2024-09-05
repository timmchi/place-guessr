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
        state[0].player1.hp = state[0].player1.hp - amount;
      }

      if (player === "p2") {
        state[1].player2.hp = state[1].player2.hp - amount;
      }
    },
  },
});

export const { removedHP } = hpSlice.actions;

export const causeHpRemoval = (player, amount) => {
  return async (dispatch) => {
    dispatch(removedHP({ player, amount }));
  };
};

export default hpSlice.reducer;
