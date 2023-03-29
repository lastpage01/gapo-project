import React, { memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveTaskAction } from "../../store/slices/taskSlice";
import { TaskItemType } from "../../store/types/task";

import "./style.css";
import TaskItem from "./TaskItem";

const getItemStyle = (isDragging: boolean, draggableStyle) => ({
  border: isDragging ? "1px solid rgb(189, 203, 210)" : "",
  background: isDragging ? "rgb(200, 200, 198)" : "",
  ...draggableStyle,
});
interface Props {
  tasks: TaskItemType[];
}
const TaskDND = ({ tasks }: Props) => {
  const dispatch = useDispatch();
  const handleDropEnd = (result) => {
    if (!result.destination) return;
    const id = result.draggableId;
    const vtOld = result.source.index;
    const vtNew = result.destination.index;
    console.log(vtOld, vtNew);

    if (!!id && !!vtOld && !!vtNew && vtOld !== vtNew)
      dispatch(moveTaskAction({ id, vtOld, vtNew }));
  };
  return (
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
                            task={task}
                            styleDrag={{
                              displayShowDrag: snapshot.isDragging && "block",
                              displayHideDrag: snapshot.isDragging && "none",
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
  );
};

export default memo(TaskDND);
