import React, { memo, useState } from "react";
import { IconIc24Fill6dotVertical } from "@gapo_ui/icon";
import { IconIc24FillCheckmarkCircle } from "@gapo_ui/icon";
import { IconIc24Line15ChevronDownCircle } from "@gapo_ui/icon";
import { IconIc24FillTrash } from "@gapo_ui/icon";

import "./style.css";
import { useDispatch } from "react-redux";
import { moveTaskAction, updateTaskAction } from "../../store/actions/tasks";

const TaskItem = ({ task, setShowMessage, setIdRemove }) => {
  const { title, status, vt } = task;
  const id = task._id;
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
    e.dataTransfer.setData("vt", vt);
  };
  const handleDrop = (e) => {
    const idTaskStart = e.dataTransfer.getData("idTaskStart");
    const vtOld = e.dataTransfer.getData("vt");
    const vtNew = e.target.getAttribute("data-vt");
    if (!!idTaskStart && !!vtOld && !!vtNew)
      dispatch(moveTaskAction(idTaskStart, vtOld, vtNew));
  };

  const handleUpdateStatusTask = () => {
    setUpdateStatus(!status);
    dispatch(updateTaskAction(id, title, !status));
  };
  return (
    <div data-vt={vt} className="wrapper-task-item" draggable={true}>
      <div className="task-item" data-vt={vt}>
        <div
          id={id}
          data-vt={vt}
          className="icon-vertical"
          style={{ width: "35px" }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          
          onDragStart={onDragStart}
        >
          <IconIc24Fill6dotVertical className="vertical" />
        </div>
        <div className="icon-check-mark" onDoubleClick={handleUpdateStatusTask}>
          {updateStatus ? (
            <IconIc24FillCheckmarkCircle color="contentTertiary" />
          ) : (
            <IconIc24Line15ChevronDownCircle color="contentTertiary" />
          )}
        </div>
        <div data-vt={vt} className="content-task">
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

export default memo(TaskItem);
