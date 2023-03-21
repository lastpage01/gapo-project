import axios from "axios";
import { setToken } from "./tasks.service";

export const callApiLogin = (email: string, password: string) => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/signIn",
    data: { email, password },
  })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      }
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const signOut = () => {
  localStorage.removeItem("token");
};

export const register = (email: string, password: string, fullName: string) => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/signUp",
    data: { email, password, fullName },
  });
};

export const changeFullName = (email: string, newFullName: string) => {
  return axios({
    method: "put",
    url: "http://localhost:3000/api/users/changeFullName",
    data: { email, newFullName },
  });
};

export const changePassword = (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  return axios({
    method: "put",
    url: "http://localhost:3000/api/users/changePassword",
    data: { email, currentPassword, newPassword },
  });
};

export const getMe = () => {
  return axios({
    method: "get",
    url: "http://localhost:3000/api/users/getMe",
    headers:setToken()
  });
};
