import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  { player1: { id: 1, hp: 5000 } },
  { player2: { id: 2, hp: 5000 } },
];

const hpSlice = createSlice({
  name: "hp",
  initialState,
  reducers: {
    removeHP(state, action) {
      const { player, amount } = action.payload;

      const playerToRemoveHpFrom =
        player === "p1" ? state.player1 : state.player2;

      const playerWithRemovedHp = {
        ...playerToRemoveHpFrom,
        hp: playerToRemoveHpFrom.hp - amount,
      };

      return state.map((p) =>
        p.id === playerToRemoveHpFrom.id ? playerWithRemovedHp : p
      );
    },
  },
});

export const { removeHP } = hpSlice.actions;

export const causeHpRemoval = (player, amount) => {
  return async (dispatch) => {
    dispatch(removeHP({ player, amount }));
  };
};

export default hpSlice.reducer;
