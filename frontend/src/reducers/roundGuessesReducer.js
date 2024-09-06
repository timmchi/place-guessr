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
    guessesReset(state) {
      state.player1Guess = null;
      state.player2Guess = null;
    },
    playerGuessesReceived(state, action) {
      const { player1Guess, player2Guess } = action.payload;

      state.player1Guess = player1Guess;
      state.player2Guess = player2Guess;
    },
  },
});

export const { locationGuessed, guessesReset, playerGuessesReceived } =
  roundGuessSlice.actions;

// export const makeGuess = (player, guessLocation) => {
//   return async (dispatch) => {
//     dispatch(locationGuessed({ player, guessLocation }));
//   };
// };

// export const resetRound = () => {
//   return async (dispatch) => {
//     dispatch(guessesReset());
//   };
// };

export default roundGuessSlice.reducer;
