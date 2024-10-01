import { createSlice, current } from "@reduxjs/toolkit";
import { calculateScore } from "../utils/scoreUtils";

let initialState = { player1RoundScore: 0, player2RoundScore: 0 };

const roundScoreSlice = createSlice({
  name: "roundScore",
  initialState,
  reducers: {
    playerScoreCalculated(state, action) {
      const { player, score } = action.payload;

      if (player === "p1") {
        state.player1RoundScore = score;
      }

      if (player === "p2") {
        state.player1RoundScore = score;
      }
    },
    roundScoresReceived(state, action) {
      const { player1Score, player2Score } = action.payload;

      state.player1RoundScore = player1Score;
      state.player2RoundScore = player2Score;
    },
    roundScoresReset(state) {
      state.player1RoundScore = 0;
      state.player2RoundScore = 0;
    },
  },
});

export const { playerScoreCalculated, roundScoresReceived, roundScoresReset } =
  roundScoreSlice.actions;

// i dont remember if i use this still?
export const calculatePlayerRoundScore = (player, distance) => {
  return async (dispatch) => {
    const score = Math.floor(calculateScore(distance));
    console.log(
      "calculating player round score for",
      player,
      "based on distance",
      distance
    );
    dispatch(playerScoreCalculated({ player, score }));

    return score;
  };
};

export default roundScoreSlice.reducer;
