import { CLEAR_MESSAGE, SET_MESSAGE } from "../actions/types";

const initialState = "";

function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return payload;
    case CLEAR_MESSAGE:
      return "";
    default:
      return state;
  }
}

export default messageReducer;
