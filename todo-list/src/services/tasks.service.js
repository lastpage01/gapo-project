import axios from "axios";

export const retrieveTaskByEmailAndDate = (email, date) => {
  return axios({
    method: "get",
    url: `http://localhost:3000/api/tasks/dateAndEmail?email=${email}&date=${date}`,
  });
};

export const createTaskByEmailAndDate = (email, date, title) => {
  return axios({
    method: "post",
    url: `http://localhost:3000/api/tasks`,
    data: { date, email, title },
  });
};
export const deleteTaskById = (id) => {
  return axios({
    method: "delete",
    url: `http://localhost:3000/api/tasks/${id}`,
  });
};

export const updateTaskById = (id, task) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/tasks/${id}`,
    data: task,
  });
};

export const moveTaskByIdAndVtNew = (id, vtNew) => {
  return axios({
    method: "put",
    url: `http://localhost:3000/api/tasks/moveTask/${id}?vt=${vtNew}`,
  });
};
