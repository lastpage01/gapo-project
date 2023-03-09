import axios from "axios";
const setToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = !!user && !!user.token ? user.token : "";
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};
export const retrieveTaskByEmailAndDate = (email, date) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/tasks/dateAndEmail?email=${email}&date=${date}`,
    headers: setToken(),
  });
};

export const createTaskByEmailAndDate = (email, date, title) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/tasks`,
    data: { date, email, title },
    headers: setToken(),
  });
};
export const deleteTaskById = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/tasks/${id}`,
    headers: setToken(),
  });
};

export const updateTaskById = (id, task) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/tasks/${id}`,
    data: task,
    headers: setToken(),
  });
};

export const moveTaskByIdAndVtNew = (id, vtNew) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/tasks/moveTask/${id}?vt=${vtNew}`,
    headers: setToken(),
  });
};
