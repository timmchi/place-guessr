import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import hpReducer from "./hpReducer";
import roundScoreReducer from "./roundScoreReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    hp: hpReducer,
    roundScore: roundScoreReducer,
  },
});

export default store;
