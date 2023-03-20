
import { loginActionSuccess } from "../store/slices/userSlice";

export const isLogin = (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) dispatch(loginActionSuccess(user));
    return !!user;
  } catch (err) {
    console.log(err);
  }
};
