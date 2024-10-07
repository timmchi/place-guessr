import { createSlice } from "@reduxjs/toolkit";

let initialState = false;

const panoramaErrorSlice = createSlice({
  name: "panoramaError",
  initialState,
  reducers: {
    errorHappened() {
      return true;
    },
    newLocationFetched() {
      return false;
    },
  },
});

export const { errorHappened, newLocationFetched } = panoramaErrorSlice.actions;

export default panoramaErrorSlice.reducer;
