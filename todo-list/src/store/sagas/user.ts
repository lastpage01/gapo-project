import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  callApiLogin,
  changeFullName,
  signOut,
} from "../../services/users.service";
import { clearMessage, setMessage } from "../slices/messageSlice";
import { loginActionFail, loginActionSuccess } from "../slices/userSlice";
import { ChangeName, Login } from "../interface/user";

export function* loginSaga(action: PayloadAction<Login>) {
  const { email, password } = action.payload;
  try {
    const user = yield call(callApiLogin, email, password);
    if (user.existed) {
      yield put(loginActionSuccess(user));
      yield put(clearMessage());
    } else {
      yield put(loginActionFail());
      yield put(setMessage(user.message));
    }
  } catch (err) {
    console.log(err);
  }
  //
}

export function* logoutSaga() {
  yield call(signOut);
}

export function* changName(action:PayloadAction<ChangeName>) {
  const { email, newName } = action.payload;
  try {
    yield call(changeFullName, email, newName);
    const user = JSON.parse(localStorage.getItem("user")!);
    user.username = newName;
    localStorage.setItem("user", JSON.stringify(user));
    yield put(loginActionSuccess(user));
  } catch (err) {
    console.log(err);
  }
}
