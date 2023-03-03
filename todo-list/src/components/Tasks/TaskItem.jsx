import React, { useState } from "react";
import { IconIc24Fill6dotVertical } from "@gapo_ui/icon";
import { IconIc24FillCheckmarkCircle } from "@gapo_ui/icon";
import { IconIc24Line15ChevronDownCircle } from "@gapo_ui/icon";
import { IconIc24FillTrash } from "@gapo_ui/icon";

import "./style.css";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../../store/actions/tasks";

const TaskItem = ({ title, id, setShowMessage, setIdRemove }) => {
  const [display, setDisplay] = useState("none");
  const [updateTask, setUpdateTask] = useState(title);

  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    setShowMessage("flex");
    setIdRemove(id);
  };

  const handleShowFormUpdate = () => {
    setDisplay("block");
  };
  const handleUpdateTask = (e) => {
    if (e.keyCode === 13) {
      if (updateTask.trim() && updateTask.trim() !== title) {
        dispatch(updateTaskAction(id, updateTask));
      }
      setDisplay("none");
    }
  };
  const onChangeUpdateTask = (e) => {
    setUpdateTask(e.target.value);
  };

  const handleLosesFocus = (e) => {
    setDisplay("none");
    e.target.value = title;
  };
  return (
    <div className="wrapper-task-item" onDoubleClick={handleShowFormUpdate}>
      <div className="task-item">
        <div className="icon-vertical" style={{ width: "35px" }}>
          <IconIc24Fill6dotVertical className="vertical" />
        </div>
        <div className="icon-check-mark">
          <IconIc24FillCheckmarkCircle
            color="contentTertiary"
            className="check-mark-circle"
          />
          <IconIc24Line15ChevronDownCircle
            color="contentTertiary"
            className="chevron-down-circle"
          />
        </div>
        <div
          className="div-title"
          style={
            display === "none" ? { display: "block" } : { display: "none" }
          }
        >
          {title}
        </div>
        <input
          type={"text"}
          className={"input-title"}
          defaultValue={title}
          onKeyDown={handleUpdateTask}
          onChange={onChangeUpdateTask}
          onBlur={handleLosesFocus}
          style={{ display: display }}
        />
        <div id={id} className="icon-delete" onClick={handleDeleteTask}>
          <IconIc24FillTrash />
        </div>
      </div>
      <div className="line" />
    </div>
  );
};

export default TaskItem;
