import { call, put } from "redux-saga/effects";
import {
  callApiLogin,
  changeFullName,
  signOut,
} from "../../services/users.service";
import { clearMessage, setMessage } from "../actions/messages";
import { loginActionFail, loginActionSuccess } from "../actions/users";

export function* login(action) {
  const { email, pass } = action.payload;
  try {
    const user = yield call(callApiLogin, email, pass);
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

export function* logout() {
  yield call(signOut);
}

export function* changName(action) {
  const { email, newFullName } = action.payload;
  try {
    yield call(changeFullName, email, newFullName);
    const user = JSON.parse(localStorage.getItem("user"));
    user.fullName = newFullName;
    localStorage.setItem("user", JSON.stringify(user));
    yield put(loginActionSuccess(user));
  } catch (err) {
    console.log(err);
  }
}
