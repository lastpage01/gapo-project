import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChangeName, GetMe, Login, LoginSuccess, UserState } from "../types/user";

const initialState: UserState = {
  isLoggedIn: false,
  username: null,
  email: null,
};
export const userSlider = createSlice({
  name: "users",
  initialState,
  reducers: {
    getMe(state,action:PayloadAction<GetMe>) {},
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
  getMe,
} = userSlider.actions;

export default userSlider.reducer;
