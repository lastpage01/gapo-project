import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  TaskItemType,
  TaskAction,
  TaskMove,
  TaskMoveSuccess,
  TaskState,
  TaskUpdate,
  TaskRetrieve,
} from "../types/task";

const initialState: TaskState = {
  taskList: [],
  isTask: true,
};
export const taskSlider = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAction(state, action: PayloadAction<TaskAction>) {},
    createTaskAction(state, action: PayloadAction<TaskItemType>) {
      state.taskList.push(action.payload);
    },
    retrieveTaskAction(state, action: PayloadAction<TaskRetrieve>) {
      if (action.payload.isMoveDate) state.taskList = action.payload.taskList;
      else state.taskList = [...state.taskList, ...action.payload.taskList];
      state.isTask = action.payload.isTask;
    },
    deleteTaskAction(state, action: PayloadAction<string>) {
      state.taskList = state.taskList.filter(
        (task) => task._id !== action.payload
      );
    },
    updateTaskAction(state, action: PayloadAction<TaskUpdate>) {
      state.taskList = state.taskList.map((task) => {
        if (task._id === action.payload.id) {
          return {
            ...task,
            title: action.payload.title,
            status: action.payload.status!,
          };
        }
        return task;
      });
    },
    moveTaskAction(state, action: PayloadAction<TaskMove>) {},
    moveTaskSuccessUp(state, action: PayloadAction<TaskMoveSuccess>) {
      state.taskList = state.taskList
        .map((t) => {
          if (t.vt >= action.payload.vtNew && t.vt < action.payload.vtOld) {
            return {
              ...t,
              vt: t.vt + 1,
            };
          }
          if (t.vt === action.payload.vtOld) {
            return {
              ...t,
              vt: action.payload.vtNew,
            };
          }
          return t;
        })
        .sort((a, b) => {
          return a.vt > b.vt ? 1 : -1;
        });
    },
    moveTaskSuccessDown(state, action: PayloadAction<TaskMoveSuccess>) {
      state.taskList = state.taskList
        .map((t) => {
          if (t.vt <= action.payload.vtNew && t.vt > action.payload.vtOld) {
            return {
              ...t,
              vt: t.vt - 1,
            };
          }
          if (t.vt === action.payload.vtOld) {
            return {
              ...t,
              vt: action.payload.vtNew,
            };
          }
          return t;
        })
        .sort((a, b) => {
          return a.vt > b.vt ? 1 : -1;
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  taskAction,
  moveTaskAction,
  createTaskAction,
  retrieveTaskAction,
  deleteTaskAction,
  updateTaskAction,
  moveTaskSuccessUp,
  moveTaskSuccessDown,
} = taskSlider.actions;

export default taskSlider.reducer;
