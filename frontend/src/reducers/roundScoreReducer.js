import { createSlice } from "@reduxjs/toolkit";
import { calculateScore } from "../utils/scoreUtils";

let initialState = [
  { player1: { id: 1, score: 0 } },
  { player2: { id: 2, score: 0 } },
];

const roundScoreSlice = createSlice({
  name: "roundScore",
  initialState,
  reducers: {
    calculateRoundScore(state, action) {
      const { player, distance } = action.payload;

      const calculatedScore = calculateScore(distance);

      const playerToCalculateScoreFor =
        player === "p1" ? state.player1 : state.player2;

      const playerWithCalculatedScore = {
        ...playerToCalculateScoreFor,
        score: calculatedScore,
      };

      return state.map((p) =>
        p.id === playerToCalculateScoreFor.id ? playerWithCalculatedScore : p
      );
    },
  },
});

export const { calculateRoundScore } = roundScoreSlice.actions;

export const calculatePlayerRoundScore = (player, distance) => {
  return async (dispatch) => {
    dispatch(calculateRoundScore({ player, distance }));
  };
};

export default roundScoreSlice.reducer;
