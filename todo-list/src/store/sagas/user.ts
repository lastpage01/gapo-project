import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  callApiLogin,
  changeFullName,
  getMe,
  signOut,
} from "../../services/users.service";
import { clearMessage, setMessage } from "../slices/messageSlice";
import { loginActionFail, loginActionSuccess, logout } from "../slices/userSlice";
import { ChangeName, GetMe, Login } from "../types/user";

export function* loginSaga(action: PayloadAction<Login>) {
  const { email, password ,success} = action.payload;
  try {
    const res = yield call(callApiLogin, email, password);
    if (res.existed) {
      yield put(loginActionSuccess({ email: email, username: res.username }));
      yield put(clearMessage());
      yield call(success)
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
    if (err.response.status === 403 ) {
      alert("Login session has expired");
      yield put(logout());
    } else {
      console.log(err);
    }
  }
}

export function* getMeSaga(action: PayloadAction<GetMe>) {
  const {onErr} = action.payload
  try {
    let token = JSON.parse(localStorage.getItem("token")!);
    if (token) {
      const { data } = yield call(getMe);
      if (data)
        yield put(
          loginActionSuccess({ email: data.email, username: data.fullName })
        );
    }
  } catch (err) {
    yield put(logout());
    yield call(onErr)
  }
}
