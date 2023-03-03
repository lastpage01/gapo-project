/* eslint-disable import/no-anonymous-default-export */
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const initialState = { isLoggedIn: false, user: null, email: null };

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.fullName,
        email: payload.email,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        email: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        email: null,
      };
    default:
      return state;
  }
}

export default userReducer;
