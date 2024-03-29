import mongoose from "mongoose";
import { TaskSchema } from "../schemas/taskSchema";

const model = mongoose.model("tasks", TaskSchema);

export const getAllTask = () => {
  return model.find().exec();
};

export const getIdTaskLast = () => {
  return model.find().sort({ id: -1 }).limit(1);
};

export const getVTLastOfDateAndEmail = (date, email) => {
  return model
    .find({ date: date, email: email })
    .sort({ vt: -1 })
    .limit(1)
    .exec();
};
export const getTaskByDateAndEmail = (date, email, page, limit) => {
  const l = !!limit ? Number(limit) : 0;
  const p =
    !!page && Number(page) > 0
      ? l > 0
        ? (Number(page) - 1) * l
        : Number(page)
      : 0;
  return model
    .find({ date: date, email: email })
    .sort({ vt: 1 })
    .skip(p)
    .limit(l)
    .exec();
};
/////////////////////////////
export const getTaskByDateAndEmailSkipLimitVT = (task, vtNew) => {
  const { date, email, vt } = task;
  const { skip, limit } = firstAndLastArrMove(vt, vtNew);
  return model
    .find({ date: date, email: email })
    .sort({ vt: 1 })
    .skip(skip)
    .limit(limit);
};

const firstAndLastArrMove = (vtOld, vtNew) => {
  const skip = vtOld > vtNew ? vtNew - 1 : vtOld;
  return { skip: skip, limit: Math.abs(vtNew - vtOld) };
};
/////////////////////

export const getTaskById = (id) => {
  return model.findById(id).limit(1).exec();
};

export const addNewTask = (newTask) => {
  return model.create(newTask);
};
export const updateTask = (id, task) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      email: task.email,
      title: task.title,
      date: task.date,
      status: task.status,
    },
  });
};

export const deleteTask = (id) => {
  return model.findByIdAndDelete(id);
};

export const moveTask = (id, vt) => {
  return model.findByIdAndUpdate(id, {
    $set: {
      vt: vt,
    },
  });
};
