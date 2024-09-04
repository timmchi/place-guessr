import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import hpReducer from "./hpReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    hp: hpReducer,
  },
});

export default store;
