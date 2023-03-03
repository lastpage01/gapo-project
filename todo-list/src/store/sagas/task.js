import {
  createTaskByEmailAndDate,
  deleteTaskById,
  retrieveTaskByEmailAndDate,
  updateTaskById,
} from "../../services/tasks.service";
import { call, put } from "redux-saga/effects";
import { createTaskAction, retrieveTaskAction } from "../actions/tasks";

export function* task(action) {
  const { email, date, title } = action.payload;
  try {
    if (title) {
      const res = yield call(createTaskByEmailAndDate, email, date, title);
      yield put(createTaskAction(res.data));
    } else {
      const res = yield call(retrieveTaskByEmailAndDate, email, date);
      yield put(retrieveTaskAction(res.data.tasks));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* deleteTask(action) {
  const id = action.payload;
  try {
    yield call(deleteTaskById, id);
  } catch (e) {
    console.log(e);
  }
}

export function* updateTask(action) {
  const { id, title } = action.payload;
  try {
    yield call(updateTaskById, id, {title});
  } catch (e) {
    console.log(e);
  }
}
