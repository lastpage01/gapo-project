import {
  createTaskByEmailAndDate,
  deleteTaskById,
  moveTaskByIdAndVtNew,
  retrieveTaskByEmailAndDate,
  updateTaskById,
} from "../../services/tasks.service";
import { call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createTaskAction,
  moveTaskSuccessDown,
  moveTaskSuccessUp,
  retrieveTaskAction,
} from "../slices/taskSlice";
import { TaskAction, TaskMove, TaskUpdate } from "../types/task";
import { logout } from "../slices/userSlice";

export function* task(action: PayloadAction<TaskAction>) {
  const { email, date, title, page = 0, limit, isMoveDate } = action.payload;
  try {
    if (title) {
      const res = yield call(createTaskByEmailAndDate, email, date, title);
      yield put(createTaskAction(res.data));
    } else {
      const res = yield call(
        retrieveTaskByEmailAndDate,
        email,
        date,
        page,
        limit
      );
      yield put(
        retrieveTaskAction({
          taskList: res.data.tasks,
          isMoveDate: !!isMoveDate,
          isTask: res.data.tasks.length < limit! ? false : true,
        })
      );
    }
  } catch (e) {
    if (e.response.status === 403) {
      yield alert("Login session has expired");
      yield put(logout());
    } else {
      console.log(e);
    }
  }
}

export function* deleteTask(action: PayloadAction<string>) {
  const id = action.payload;
  try {
    yield call(deleteTaskById, id);
  } catch (e) {
    if (e.response.status === 403) {
      alert("Login session has expired");
      yield put(logout());
    } else {
      console.log(e);
    }
  }
}

export function* updateTask(action: PayloadAction<TaskUpdate>) {
  const { id, title, status } = action.payload;

  try {
    yield call(updateTaskById, id, { title, status });
  } catch (e) {
    if (e.response.status === 403) {
      alert("Login session has expired");
      yield put(logout());
    } else {
      console.log(e);
    }
  }
}

export function* moveTask(action: PayloadAction<TaskMove>) {
  const { id, vtOld, vtNew } = action.payload;
  try {
    if (vtOld > vtNew) yield put(moveTaskSuccessUp({ vtOld, vtNew }));
    else yield put(moveTaskSuccessDown({ vtOld, vtNew }));
    yield call(moveTaskByIdAndVtNew, id, vtNew);
  } catch (e) {
    if (e.response.status === 403) {
      alert("Login session has expired");
      yield put(logout());
    } else {
      console.log(e);
    }
  }
}
