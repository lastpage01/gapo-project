import express from "express";
import { authenticateToken } from "../common/authentication";
import {
  addNewTask,
  deleteTask,
  getAllTask,
  getIdTaskLast,
  getTaskByDateAndEmail,
  getTaskByDateAndEmailSkipLimitVT,
  getTaskById,
  getVTLastOfDateAndEmail,
  moveTask,
  updateTask,
} from "../DAL/models/taskModel";

const taskRouter = express.Router();

taskRouter.get("/", (req, res) => {
  getAllTask().then((data) => {
    res.json({ count: data.length, tasks: data });
  });
});

taskRouter.get("/findById/:id", (req, res) => {
  const { id } = req.params;
  getTaskById(id).then((data) => {
    res.json({ data });
  });
});

taskRouter.get("/dateAndEmail", (req, res) => {
  const date = new Date(req.query.date);
  const email = req.query.email;
  getTaskByDateAndEmail(date, email).then((data) => {
    res.json({ count: data.length, tasks: data });
  });
});

taskRouter.post("/", (req, res) => {
  const newTask = req.body;
  newTask.status = false;
  getVTLastOfDateAndEmail(newTask.date, newTask.email)
    .then((data) => {
      newTask.vt = data.length ? data[0].vt + 1 : 1;
    })
    .then(() => {
      getIdTaskLast().then((data) => {
        newTask.id = data.length ? data[0].id + 1 : 1;
        addNewTask(newTask)
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.send(err);
          });
      });
    });
});

taskRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const task = req.body;
  updateTask(id, task)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      throw err;
    });
});

taskRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteTask(id)
    .then((dataDeleted) => {
      getVTLastOfDateAndEmail(dataDeleted.date, dataDeleted.email).then(
        (data) => {
          if (!data.length) return;
          const { date, email, vt } = data[0];
          moveVTBeforeOrAfter(
            date,
            email,
            Number(dataDeleted.vt) - 1,
            Number(vt)
          );
        }
      );
      res.json(dataDeleted);
    })
    .catch((err) => {
      throw err;
    });
});

/////////////////
taskRouter.put("/moveTask/:id", (req, res) => {
  const { id } = req.params;
  const vtNew = Number(req.query.vt);
  if (!!id && !!vtNew) move(id, vtNew, res);
  else res.json({ moveSuccess: false });
});

const move = (id, vtNew, res) => {
  getTaskById(id)
    .then((data) => {
      if (data.vt !== vtNew) {
        moveVTBeforeOrAfter(data, vtNew).then(() => {
          moveTask(id, vtNew)
            .then((data) => {
              res.json({ moveSuccess: true, task: data });
            })
            .catch((err) => {
              throw err;
            });
        });
      } else res.send("The new location must be different from the old one");
    })
    .catch((err) => {
      throw err;
    });
};

const moveVTBeforeOrAfter = (task, vtNew) => {
  return getTaskByDateAndEmailSkipLimitVT(task, vtNew).then((data) => {
    const index = task.vt > vtNew ? 1 : -1;
    data.forEach((element) => {
      moveTask(element._id, element.vt + index).catch((err) => {
        throw err;
      });
    });
  });
};
/////////////////////////
export default taskRouter;
