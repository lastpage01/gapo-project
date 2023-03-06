import {
  createTaskByEmailAndDate,
  deleteTaskById,
  moveTaskByIdAndVtNew,
  retrieveTaskByEmailAndDate,
  updateTaskById,
} from "../../services/tasks.service";
import { call, put } from "redux-saga/effects";
import {
  createTaskAction,
  moveTaskSuccessDown,
  moveTaskSuccessUp,
  retrieveTaskAction,
} from "../actions/tasks";

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
  const { id, title, status } = action.payload;
  try {
    yield call(updateTaskById, id, { title, status });
  } catch (e) {
    console.log(e);
  }
}

export function* moveTask(action) {
  const { id, vtOld, vtNew } = action.payload;
  try {
    const res = yield call(moveTaskByIdAndVtNew, id, vtNew);
    if (res.data.moveSuccess === true) {
      if (vtOld > vtNew) yield put(moveTaskSuccessUp(vtOld, vtNew));
      else yield put(moveTaskSuccessDown(vtOld,vtNew))
    }
  } catch (e) {
    console.log(e);
  }
}
