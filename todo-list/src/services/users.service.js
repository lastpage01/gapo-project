import axios from "axios";

export const callApiLogin = (email, password) => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/signIn",
    data: { email, password },
  })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const signOut = () => {
  localStorage.removeItem("user");
};

export const register = (user) => {
  return axios({
    method: "post",
    url: "http://localhost:3000/api/users/signUp",
    data: user,
  });
};

export const changeFullName = (email, newFullName) => {
  return axios({
    method: "put",
    url: "http://localhost:3000/api/users/changeFullName",
    data: { email, newFullName },
  });
};

export const changePassword = (email, currentPassword, newPassword) => {
  return axios({
    method: "put",
    url: "http://localhost:3000/api/users/changePassword",
    data: { email, currentPassword, newPassword },
  });
};
