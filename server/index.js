import express from "express";
import cors from "cors";

import db from "./DAL/database";
import taskRouter from "./routers/tasks";
import userRouter from "./routers/users";
import { authenticateToken } from "./common/authentication";

const app = express();
const post = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Sever Todo List fwU89cavVmHOklBr");
});

app.use("/api/users", userRouter);
app.use("/api/tasks",authenticateToken, taskRouter);

app.listen(post, (res, req) => {
  console.log("database is connected !");
  db()
    .then(() => {
      console.log("database is connected !");
    })
    .catch((err) => {
      throw err;
    });
});
