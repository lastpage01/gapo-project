import { takeLatest } from "redux-saga/effects";
import {
  deleteTaskAction,
  moveTaskAction,
  taskAction,
  updateTaskAction,
} from "../slices/taskSlice";

import { actionChangeName, getMe, login, logout } from "../slices/userSlice";
import { deleteTask, moveTask, task, updateTask } from "./task";
import { changName, getMeSaga, loginSaga, logoutSaga } from "./user";

function* root() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga);
  yield takeLatest(actionChangeName.type, changName);
  yield takeLatest(getMe.type, getMeSaga);
  yield takeLatest(taskAction.type, task);
  yield takeLatest(deleteTaskAction.type, deleteTask);
  yield takeLatest(updateTaskAction.type, updateTask);
  yield takeLatest(moveTaskAction.type, moveTask);
}

export default root;
