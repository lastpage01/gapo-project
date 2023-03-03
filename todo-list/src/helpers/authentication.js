import { LOGIN_SUCCESS } from "../store/actions/types";

export const isLogin = (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    return !!user;
  } catch (err) {
    console.log(err);
  }
};
