import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: Date,
  email: String,
  vt: Number,
  status: Boolean,
});
