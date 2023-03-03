import {
  CREATE_TASK,
  DELETE_TASK,
  RETRIEVE_TASK,
  UPDATE_TASK,
} from "../actions/types";

const initialState = [];

function taskReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_TASK:
      return payload;
    case CREATE_TASK:
      return [...state, payload];
    case DELETE_TASK:
      state = state.filter((task) => task._id !== payload);
      return state;
    case UPDATE_TASK:
      return state.map((task) => {
        if (task._id === payload.id) {
          return {
            ...task,
            title: payload.title,
          };
        } else return task;
      });
    default:
      return state;
  }
}
export default taskReducer;
