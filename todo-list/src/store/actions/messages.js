import { CLEAR_MESSAGE, SET_MESSAGE } from "./types";

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};
