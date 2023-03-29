import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { UserSchema } from "../schemas/userSchema";

const model = mongoose.model("users", UserSchema);

export const getAllUser = () => {
  return model.find().exec();
};
export const getMe = (email) => {
  return model.find({ email: email }).limit(1).exec();
};

export const signIn = (email, pass) => {
  return model.find({ email: email, password: pass }).limit(1).exec();
};

export const signUp = (newUser) => {
  return model.create(newUser);
};

export const changeFullName = (id, fullName)=>{

    return model.findByIdAndUpdate(id, {
        $set: {
          fullName: fullName,
        },
      });
}
export const changePassword = (id, password)=>{

    return model.findByIdAndUpdate(id, {
        $set: {
          password: password,
        },
      });
}

export const generateAccessToken = (email) => {
    return jwt.sign({ email: email }, "bWluZHgud2ViNjE=", {
      expiresIn: "15h",
    });
  };
