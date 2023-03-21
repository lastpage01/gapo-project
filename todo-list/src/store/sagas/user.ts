import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  callApiLogin,
  changeFullName,
  getMe,
  signOut,
} from "../../services/users.service";
import { clearMessage, setMessage } from "../slices/messageSlice";
import { loginActionFail, loginActionSuccess } from "../slices/userSlice";
import { ChangeName, Login } from "../interface/user";

export function* loginSaga(action: PayloadAction<Login>) {
  const { email, password } = action.payload;
  try {
    const res = yield call(callApiLogin, email, password);
    if (res.existed) {
      const { data } = yield call(getMe);
      if (data) {
        yield put(
          loginActionSuccess({ email: data.email, username: data.fullName })
        );
        yield put(clearMessage());
      }
    } else {
      yield put(loginActionFail());
      yield put(setMessage(res.message));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* logoutSaga() {
  yield call(signOut);
}

export function* changName(action: PayloadAction<ChangeName>) {
  const { email, newName } = action.payload;
  try {
    yield call(changeFullName, email, newName);
    yield put(loginActionSuccess({ email, username: newName }));
  } catch (err) {
    console.log(err);
  }
}

export function* getMeSaga() {
  try {
    const { data } = yield call(getMe);
    if (data) 
      yield put(
        loginActionSuccess({ email: data.email, username: data.fullName })
      );
  } catch (err) {
    yield call(signOut)
  }
}
