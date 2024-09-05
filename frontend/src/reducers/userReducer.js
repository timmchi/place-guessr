import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload;
    },
  },
});

export const { userSet } = userSlice.actions;

export const initializeUser = (user) => {
  return async (dispatch) => {
    userService.setToken(user.token);
    dispatch(userSet(user));
  };
};

export default userSlice.reducer;
