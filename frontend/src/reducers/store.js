import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import hpReducer from "./hpReducer";
import roundScoreReducer from "./roundScoreReducer";
import roundGuessesReducer from "./roundGuessesReducer";
import playerReducer from "./playerReducer";
import vsGameReducer from "./vsGameReducer";
import gameTypeReducer from "./gameTypeReducer";
import roundDistanceReducer from "./roundDistanceReducer";
import roomPlayersReducer from "./roomPlayersReducer";
import roomCodeReducer from "./roomCodeReducer";
import panoramaErrorReducer from "./panoramaErrorReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    hp: hpReducer,
    roundScore: roundScoreReducer,
    roundGuesses: roundGuessesReducer,
    player: playerReducer,
    vsGame: vsGameReducer,
    gameType: gameTypeReducer,
    roundDistance: roundDistanceReducer,
    roomPlayers: roomPlayersReducer,
    roomCode: roomCodeReducer,
    panoramaError: panoramaErrorReducer,
  },
});

export default store;
