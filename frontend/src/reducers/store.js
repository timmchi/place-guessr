import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import hpReducer from "./hpReducer";
import roundScoreReducer from "./roundScoreReducer";
import roundGuessesReducer from "./roundGuessesReducer";
import playerReducer from "./playerReducer";
import vsGameReducer from "./vsGameReducer";
import gameTypeReducer from "./gameTypeReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    hp: hpReducer,
    roundScore: roundScoreReducer,
    roundGuesses: roundGuessesReducer,
    player: playerReducer,
    vsGame: vsGameReducer,
    gameType: gameTypeReducer,
  },
});

export default store;
