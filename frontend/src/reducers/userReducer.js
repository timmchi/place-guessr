import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = (user) => {
  return async (dispatch) => {
    userService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;