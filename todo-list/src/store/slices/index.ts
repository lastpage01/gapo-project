import { combineReducers } from "redux";
import tasks from "./taskSlice";
import users from "./userSlice";
import message from "./messageSlice";
export default combineReducers({
  tasks,
  users,
  message,
});
