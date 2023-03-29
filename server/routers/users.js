import express from "express";
import { authenticateToken } from "../common/authentication";
import {
  changeFullName,
  changePassword,
  getAllUser,
  getMe,
  signIn,
  signUp,
  generateAccessToken,
} from "../DAL/models/userModel";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  getAllUser().then((data) => {
    res.json({ count: data.length, users: data });
  });
});

userRouter.get("/getMe", authenticateToken, (req, res) => {
  const { email } = req.user;
  getMe(email)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      throw err;
    });
});

userRouter.post("/signIn", (req, res) => {
  const { email, password } = req.body;
  signIn(email, password)
    .then((data) => {
      if (data.length > 0) {
        let token = generateAccessToken(email);
        res.json({ existed: true, token: token, username: data[0].fullName });
      } else res.send({ message: "Login failed!" });
    })
    .catch((err) => {
      throw err;
    });
});

userRouter.post("/signUp", (req, res) => {
  const newUser = req.body;
  getMe(newUser.email).then((data) => {
    if (data.length < 1) {
      signUp(newUser)
        .then((data) => {
          res.json({ data });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.status(401).send("Email already exists");
    }
  });
});

userRouter.put("/changeFullName", (req, res) => {
  const { email, newFullName } = req.body;
  getMe(email).then((data) => {
    if (data.length > 0) {
      changeFullName(data[0].id, newFullName)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send("Email not found");
    }
  });
});

userRouter.put("/changePassword", (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  getMe(email).then((data) => {
    if (data.length > 0) {
      if (data[0].password === currentPassword) {
        changePassword(data[0].id, newPassword)
          .then((data) => {
            res.json({ data });
          })
          .catch((err) => {
            res.send(err);
          });
      } else res.status(500).send("Incorrect current password....!");
    } else {
      res.status(404).send("Email not found");
    }
  });
});

export default userRouter;
