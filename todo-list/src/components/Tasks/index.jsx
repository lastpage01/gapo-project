import { InputField } from "@gapo_ui/components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../helpers/validator";
import { taskAction } from "../../store/actions/tasks";

import "./style.css";
import TaskItem from "./TaskItem";
const Task = ({ fullDate, setShowMessage, setIdRemove }) => {
  const [newTask, setNewTask] = useState("");
  const [helper, setHelper] = useState("");
  const [isErr, setIsErr] = useState(false);

  const dispatch = useDispatch();

  const { email } = useSelector((state) => state.users);
  const date = `${fullDate.year}/${fullDate.month}/${fullDate.date}`;

  const { tasks } = useSelector((state) => state);
  useEffect(() => {
    dispatch(taskAction(email, date));
  }, [date, dispatch, email]);

  const onChangeNewTask = (e) => {
    setNewTask(e.target.value);
  };
  const onKeyDownEnter = (e) => {
    if (e.keyCode === 13) {
      if (checkEmptyInput() === false) {
        dispatch(taskAction(email, date, newTask));
        setNewTask("");
      }
    }
  };
  const handleLosesFocus = (e) => {
    setIsErr(false);
    if (e.target.value.trim()) setNewTask("");
    setHelper("");
  };
  const checkEmptyInput = () => {
    const isErrInput = isEmpty(newTask);
    setHelper(isErrInput);
    setIsErr(!!isErrInput);
    return !!isErrInput;
  };
  // console.log('running');
  return (
    <div className="wrapper-list-item">
      {tasks &&
        tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              setShowMessage={setShowMessage}
              setIdRemove={setIdRemove}
              task = {task}
            />
          );
        })}
      <div className="add-task">
        <InputField
          placeholder="Add task..."
          variant="invisible"
          fullWidth
          onChange={onChangeNewTask}
          onKeyDown={onKeyDownEnter}
          value={newTask}
          helperText={helper}
          error={isErr}
          onBlur={handleLosesFocus}
        />
      </div>
    </div>
  );
};

export default Task;
