import { createSlice } from "@reduxjs/toolkit";
import { gameEnded } from "./vsGameReducer";

let initialState = "";

const roomCodeSlice = createSlice({
  name: "roomCode",
  initialState,
  reducers: {
    // the code for the room is received from the backend
    codeSubmitted(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameEnded, () => "");
  },
});

export const { codeSubmitted } = roomCodeSlice.actions;

export default roomCodeSlice.reducer;
