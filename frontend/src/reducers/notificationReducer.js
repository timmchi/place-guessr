import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "green",
  message: "",
  open: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      const { color, message } = action.payload;

      state.color = color;
      state.message = message;
      state.open = true;
    },
    hideNotification(state) {
      state.open = false;
    },
  },
  // add extra reducers soon
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
