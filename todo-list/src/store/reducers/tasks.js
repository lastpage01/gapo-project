import {
  CREATE_TASK,
  DELETE_TASK,
  MOVE_SUCCESS_DOWN,
  MOVE_SUCCESS_UP,
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
      return state.filter((task) => task._id !== payload);
    case UPDATE_TASK:
      return state.map((task) => {
        if (task._id === payload.id) {
          return {
            ...task,
            title: payload.title,
            status: payload.status,
          };
        }
        return task;
      });
    case MOVE_SUCCESS_UP:
      return state
        .map((t) => {
          if (
            t.vt >= parseInt(payload.vtNew, 10) &&
            t.vt < parseInt(payload.vtOld, 10)
          ) {
            return {
              ...t,
              vt: t.vt + 1,
            };
          }
          if (t.vt === parseInt(payload.vtOld, 10)) {
            return {
              ...t,
              vt: parseInt(payload.vtNew, 10),
            };
          }
          return t;
        })
        .sort((a, b) => {
          return a.vt > b.vt ? 1 : -1;
        });
    case MOVE_SUCCESS_DOWN:
      return state
        .map((t) => {
          if (
            t.vt <= parseInt(payload.vtNew, 10) &&
            t.vt > parseInt(payload.vtOld, 10)
          ) {
            return {
              ...t,
              vt: t.vt - 1,
            };
          }
          if (t.vt === parseInt(payload.vtOld, 10)) {
            return {
              ...t,
              vt: parseInt(payload.vtNew, 10),
            };
          }
          return t;
        })
        .sort((a, b) => {
          return a.vt > b.vt ? 1 : -1;
        });

    default:
      return state;
  }
}
export default taskReducer;
