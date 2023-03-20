import { InputField } from "@gapo_ui/components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./style.css";
import TaskItem from "./TaskItem";
import { getItemStyle } from "../../helpers/defineStyle";
import { isEmpty } from "../../helpers/validator";
import { moveTaskAction, taskAction } from "../../store/slices/taskSlice";
import { RootState } from "../../store";
interface Props {
  fullDate: { date: number; month: number; year: number };
  setShowMessage: (value: boolean) => void;
  setIdRemove: (value: null | string) => void;
}
const Task = ({
  fullDate,
  setShowMessage,
  setIdRemove,
}: Props): JSX.Element => {
  const [newTask, setNewTask] = useState("");
  const [helper, setHelper] = useState("");
  const [isErr, setIsErr] = useState(false);

  const dispatch = useDispatch();

  const { email } = useSelector((state: RootState) => state.users);
  const tasks = useSelector((state: RootState) => state.tasks.taskList);

  const date = `${fullDate.year}/${fullDate.month}/${fullDate.date}`;
  useEffect(() => {
    dispatch(taskAction({ email: email!, date }));
  }, [date, dispatch, email]);

  const onChangeNewTask = (e) => {
    setNewTask(e.target.value);
  };
  const onKeyDownEnter = (e) => {
    if (e.keyCode === 13) {
      if (checkEmptyInput() === false) {
        dispatch(taskAction({ email: email!, date, title: newTask }));
        setNewTask("");
      }
    }
  };
  const handleLosesFocus = (): void => {
    setIsErr(false);
    setNewTask("");
    setHelper("");
  };
  const checkEmptyInput = (): boolean => {
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
    if (!!id && !!vtOld && !!vtNew)
      dispatch(moveTaskAction({ id, vtOld, vtNew }));
  };
  return (
    <div className="wrapper-list-item">
      <DragDropContext onDragEnd={handleDropEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ width: "100%" }}
            >
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
                              style={{
                                displayShowDrag: snapshot.isDragging ? "block" : "",
                                displayHideDrag: snapshot.isDragging ? "none" : "",
                              }}
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
          variant={tasks.length > 0 ? "invisible" : "outlined"}
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
