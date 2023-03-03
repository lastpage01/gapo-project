import React, { useState } from "react";
import { IconIc24Fill6dotVertical } from "@gapo_ui/icon";
import { IconIc24FillCheckmarkCircle } from "@gapo_ui/icon";
import { IconIc24Line15ChevronDownCircle } from "@gapo_ui/icon";
import { IconIc24FillTrash } from "@gapo_ui/icon";

import "./style.css";
import { useDispatch } from "react-redux";
import { moveTaskAction, updateTaskAction } from "../../store/actions/tasks";

const TaskItem = ({ title, id, vt, status, setShowMessage, setIdRemove }) => {
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [updateTask, setUpdateTask] = useState(title);
  const [updateStatus, setUpdateStatus] = useState(status);

  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    setShowMessage("flex");
    setIdRemove(id);
  };

  const handleShowFormUpdate = () => {
    setShowFormUpdate(true);
  };
  const handleUpdateTask = (e) => {
    if (e.keyCode === 13) {
      if (updateTask.trim() && updateTask.trim() !== title) {
        dispatch(updateTaskAction(id, updateTask));
      }
      setShowFormUpdate(false);
    }
  };
  const onChangeUpdateTask = (e) => {
    setUpdateTask(e.target.value);
  };

  const handleLosesFocus = (e) => {
    setShowFormUpdate(false);
    e.target.value = title;
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData("idTaskStart", e.target.id);
  };
  const handleDrop = (e) => {
    const idTaskStart = e.dataTransfer.getData("idTaskStart");
    const vtNew = e.target.getAttribute("data-vt");
    dispatch(moveTaskAction(idTaskStart, vtNew));
  };

  const handleUpdateStatusTask = () => {
    setUpdateStatus(!status);
    dispatch(updateTaskAction(id, title, !status));
  };
  return (
    <div className="wrapper-task-item">
      <div className="task-item">
        <div className="icon-vertical" style={{ width: "35px" }}>
          <IconIc24Fill6dotVertical className="vertical" />
        </div>
        <div className="icon-check-mark" onDoubleClick={handleUpdateStatusTask}>
          {updateStatus ? (
            <IconIc24FillCheckmarkCircle color="contentTertiary" />
          ) : (
            <IconIc24Line15ChevronDownCircle color="contentTertiary" />
          )}
        </div>
        <div
          id={id}
          data-vt={vt}
          className="content-task"
          draggable
          onDragStart={onDragStart}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {!showFormUpdate ? (
            <div
              data-vt={vt}
              className="div-title"
              onDoubleClick={handleShowFormUpdate}
            >
              {title}
            </div>
          ) : (
            <input
              data-vt={vt}
              type={"text"}
              className={"input-title"}
              defaultValue={title}
              onKeyDown={handleUpdateTask}
              onChange={onChangeUpdateTask}
              onBlur={handleLosesFocus}
            />
          )}
        </div>

        <div id={id} className="icon-delete" onClick={handleDeleteTask}>
          <IconIc24FillTrash />
        </div>
      </div>
      <div className="line" />
    </div>
  );
};

export default TaskItem;
