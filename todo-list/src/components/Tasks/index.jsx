import { InputField } from "@gapo_ui/components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../helpers/validator";
import { moveTaskAction, taskAction } from "../../store/actions/tasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./style.css";
import TaskItem from "./TaskItem";

const getItemStyle = (isDragging, draggableStyle) => ({
  border: isDragging ? "3px solid rgb(189, 203, 210)" : "",
  background: isDragging ? "rgb(198, 198, 198)" : "",

  ...draggableStyle,
});

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
  const handleDropEnd = (result) => {
    if (!result.destination) return;
    const id = result.draggableId;
    const vtOld = result.source.index;
    const vtNew = result.destination.index;
    if (!!id && !!vtOld && !!vtNew) dispatch(moveTaskAction(id, vtOld, vtNew));
  };
  return (
    <div className="wrapper-list-item">
      <DragDropContext onDragEnd={handleDropEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks &&
                tasks.map((task) => {
                  return (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={task.vt}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <TaskItem
                              key={task.id}
                              setShowMessage={setShowMessage}
                              setIdRemove={setIdRemove}
                              task={task}
                              showIcon={snapshot.isDragging ? "block" : "none"}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
