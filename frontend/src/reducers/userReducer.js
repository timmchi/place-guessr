import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload;
    },
    userLoggedOut() {
      return null;
    },
    userUpdated(state, action) {
      const { username } = action.payload;
      state.user.username = username;
    },
  },
});

export const { userSet, userLoggedOut, userUpdated } = userSlice.actions;

export const initializeUser = (user) => {
  return async (dispatch) => {
    userService.setToken(user.token);
    dispatch(userSet(user));
  };
};

export default userSlice.reducer;
