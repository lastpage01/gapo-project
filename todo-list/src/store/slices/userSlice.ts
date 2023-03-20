import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChangeName, Login, LoginSuccess, UserState } from "../interface/user";

const initialState: UserState = {
  isLoggedIn: false,
  username: null,
  email: null,
};
export const userSlider = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Login>) {},
    loginActionSuccess(state, action: PayloadAction<LoginSuccess>) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    loginActionFail(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.email = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.email = null;
    },
    actionChangeName(state, action: PayloadAction<ChangeName>) {},
  },
});

export const {
  login,
  loginActionSuccess,
  loginActionFail,
  logout,
  actionChangeName,
} = userSlider.actions;

export default userSlider.reducer;
