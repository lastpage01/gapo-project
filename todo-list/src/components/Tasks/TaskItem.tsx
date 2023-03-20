import React, { useState } from "react";
import { IconIc24Fill6dotVertical } from "@gapo_ui/icon";
import { IconIc24FillCheckmarkCircle } from "@gapo_ui/icon";
import { IconIc24FillTrash } from "@gapo_ui/icon";
import { IconIc24Line15CheckMarkCircle } from "@gapo_ui/icon";
import { InputField } from "@gapo_ui/components";
import { useDispatch } from "react-redux";

import "./style.css";
import { updateTaskAction } from "../../store/slices/taskSlice";

interface Props {
  task: {
    _id: string;
    title: string;
    status: boolean;
    vt: number;
    id: number;
    date: string;
  };
  setShowMessage: (value: boolean) => void;
  setIdRemove: (value: string | null) => void;
  style: {
    displayShowDrag: "block" | "";
    displayHideDrag: "none" | "";
  };
}

const TaskItem = ({ task, setShowMessage, setIdRemove, style }: Props) => {
  const { title, status } = task;
  const id = task._id;

  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [updateTask, setUpdateTask] = useState(title);
  const [updateStatus, setUpdateStatus] = useState(status);

  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    setShowMessage(true);
    setIdRemove(id);
  };

  const handleShowFormUpdate = () => {
    setShowFormUpdate(true);
  };
  const handleUpdateTask = (e) => {
    if (e.keyCode === 13) {
      if (updateTask.trim() && updateTask.trim() !== title) {
        dispatch(updateTaskAction({ id, title: updateTask }));
      }
      setShowFormUpdate(false);
    }
  };
  const onChangeUpdateTask = (e) => {
    setUpdateTask(e.target.value);
  };

  const handleLosesFocusFormUpdate = (e) => {
    setShowFormUpdate(false);
    e.target.value = title;
  };
  const handleUpdateStatusTask = () => {
    setUpdateStatus(!status);
    dispatch(updateTaskAction({ id, title, status: !status }));
  };
  return (
    <div className="wrapper-task-item">
      <div className="task-item">
        <div className="icon-vertical">
          <IconIc24Fill6dotVertical
            className="vertical"
            UNSAFE_style={{ display: style.displayShowDrag }}
          />
        </div>
        <div className="icon-check-mark" onDoubleClick={handleUpdateStatusTask}>
          {updateStatus ? (
            <IconIc24FillCheckmarkCircle color="contentTertiary" />
          ) : (
            <IconIc24Line15CheckMarkCircle color="contentTertiary" />
          )}
        </div>
        <div className="content-task" onDoubleClick={handleShowFormUpdate}>
          {!showFormUpdate ? (
            <div
              className="div-title"
              style={{ display: style.displayShowDrag }}
            >
              {title}
            </div>
          ) : (
            <InputField
              type={"text"}
              fullWidth
              onBlur={handleLosesFocusFormUpdate}
              defaultValue={title}
              onKeyDown={handleUpdateTask}
              onChange={onChangeUpdateTask}
              placeholder="Write a task name"
            />
          )}
        </div>

        <div
          id={id}
          className="icon-delete"
          onClick={handleDeleteTask}
          style={{ display: style.displayShowDrag }}
        >
          <IconIc24FillTrash />
        </div>
      </div>
      <div className="line" style={{ display: style.displayHideDrag }} />
    </div>
  );
};

export default TaskItem;
