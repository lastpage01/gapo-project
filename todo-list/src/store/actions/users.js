import { CHANGE_NAME, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./types";

export const login = (email, pass) => {
  return {
    type: LOGIN,
    payload: {
      email,
      pass,
    },
  };
};

export const loginActionSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginActionFail = () => {
  return {
    type: LOGIN_FAIL,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};

export const actionChangeName = (email,newFullName) => {
  return {
    type: CHANGE_NAME,
    payload: {email,newFullName},
  };
};
