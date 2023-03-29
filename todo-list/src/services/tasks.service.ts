import axios from "axios";
export const setToken = () => {
  let token = JSON.parse(localStorage.getItem("token")!);
  token = token ? token : "";
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};
export const retrieveTaskByEmailAndDate = (
  email: string,
  date: string,
  page?: number,
  // skip?: number,
  limit?: number,
) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/tasks/getTaskByDateAndEmail?email=${email}&date=${date}&page=${page}&limit=${limit}`,
    headers: setToken(),
  });
};

export const createTaskByEmailAndDate = (
  email: string,
  date: string,
  title: string
) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/tasks`,
    data: { date, email, title },
    headers: setToken(),
  });
};
export const deleteTaskById = (id: string) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/tasks/${id}`,
    headers: setToken(),
  });
};

export const updateTaskById = (
  id: string,
  task: { title: string; status?: boolean }
) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/tasks/${id}`,
    data: task,
    headers: setToken(),
  });
};

export const moveTaskByIdAndVtNew = (id: string, vtNew: number) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/tasks/moveTask/${id}?vt=${vtNew}`,
    headers: setToken(),
  });
};
