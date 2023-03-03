import { combineReducers } from "redux";
import users from "./users";
import message from "./message";
import tasks from "./tasks";
export default combineReducers({
  users,
  message,
  tasks
});
