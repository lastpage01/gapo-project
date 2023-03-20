import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Task,
  TaskAction,
  TaskMove,
  TaskMoveSuccess,
  TaskUpdate,
} from "../interface/task";

export interface TaskState {
  taskList: Task[];
}

const initialState: TaskState = {
  taskList: [],
};
export const taskSlider = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAction(state, action: PayloadAction<TaskAction>) {},
    createTaskAction(state, action: PayloadAction<Task>) {
      state.taskList.push(action.payload);
    },
    retrieveTaskAction(state, action: PayloadAction<Task[]>) {
      state.taskList = action.payload;
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
