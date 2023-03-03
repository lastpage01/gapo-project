import { takeLatest } from "redux-saga/effects";
import {
  CHANGE_NAME,
  DELETE_TASK,
  LOGIN,
  LOGOUT,
  TASK,
  UPDATE_TASK,
} from "../actions/types";
import { deleteTask, task, updateTask } from "./task";
import { changName, login, logout } from "./user";

function* root() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(CHANGE_NAME, changName);
  yield takeLatest(TASK, task);
  yield takeLatest(DELETE_TASK, deleteTask);
  yield takeLatest(UPDATE_TASK, updateTask);
}

export default root;
