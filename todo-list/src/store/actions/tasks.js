import {
  CREATE_TASK,
  DELETE_TASK,
  MOVE_TASK,
  RETRIEVE_TASK,
  TASK,
  UPDATE_TASK,
} from "./types";

export const taskAction = (email, date, title) => {
  return {
    type: TASK,
    payload: { email, date, title },
  };
};

export const retrieveTaskAction = (tasks) => {
  return {
    type: RETRIEVE_TASK,
    payload: tasks,
  };
};

export const createTaskAction = (task) => {
  return {
    type: CREATE_TASK,
    payload: task,
  };
};

export const deleteTaskAction = (id) => {
  return {
    type: DELETE_TASK,
    payload: id,
  };
};

export const updateTaskAction = (id, title, status) => {
  return {
    type: UPDATE_TASK,
    payload: { id, title, status },
  };
};

export const moveTaskAction = (id, vtNew, email, date) => {
  return {
    type: MOVE_TASK,
    payload: { id, vtNew, email, date },
  };
};
