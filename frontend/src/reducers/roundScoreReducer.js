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
    playerScoreCalculated(state, action) {
      const { player, score } = action.payload;

      if (player === "p1") {
        state[0].player1.score = score;
      }

      if (player === "p2") {
        state[1].player2.score = score;
      }
    },
    roundScoresReceived(state, action) {
      const { player1Score, player2Score } = action.payload;

      state[0].player1.score = player1Score;
      state[1].player2.score = player2Score;
    },
  },
});

export const { playerScoreCalculated, roundScoresReceived } =
  roundScoreSlice.actions;

export const calculatePlayerRoundScore = (player, distance) => {
  return async (dispatch) => {
    const score = Math.floor(calculateScore(distance));

    dispatch(playerScoreCalculated({ player, score }));
  };
};

export default roundScoreSlice.reducer;
