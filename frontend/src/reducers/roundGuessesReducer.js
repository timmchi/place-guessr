import { createSlice, current } from "@reduxjs/toolkit";

let initialState = { player1Guess: null, player2Guess: null };

const roundGuessSlice = createSlice({
  name: "roundGuess",
  initialState,
  reducers: {
    locationGuessed(state, action) {
      const { player, guessLocation } = action.payload;

      if (player === "p1") {
        state.player1Guess = guessLocation;
      }

      if (player === "p2") {
        state.player2Guess = guessLocation;
      }
    },
    guessesReset() {
      return null;
    },
  },
});

export const { locationGuessed, guessesReset } = roundGuessSlice.actions;

export const makeGuess = (player, guessLocation) => {
  return async (dispatch) => {
    dispatch(locationGuessed({ player, guessLocation }));
  };
};

export const resetRound = () => {
  return async (dispatch) => {
    dispatch(guessesReset());
  };
};

export default roundGuessSlice.reducer;
