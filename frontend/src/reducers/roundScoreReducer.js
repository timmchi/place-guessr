import { createSlice, current } from "@reduxjs/toolkit";
import { calculateScore } from "../utils/scoreUtils";

let initialState = [
  { player1: { id: 1, score: 0 } },
  { player2: { id: 2, score: 0 } },
];

const roundScoreSlice = createSlice({
  name: "roundScore",
  initialState,
  reducers: {
    setRoundScore(state, action) {
      const { player, score } = action.payload;

      if (player === "p1") {
        state[0].player1.score = score;
      }

      if (player === "p2") {
        state[1].player2.score = score;
      }
    },
  },
});

export const { setRoundScore } = roundScoreSlice.actions;

export const calculatePlayerRoundScore = (player, distance) => {
  return async (dispatch) => {
    const score = Math.floor(calculateScore(distance));

    dispatch(setRoundScore({ player, score }));
  };
};

export default roundScoreSlice.reducer;
