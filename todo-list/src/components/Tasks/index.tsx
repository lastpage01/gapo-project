import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { taskAction } from "../../store/slices/taskSlice";
import { RootState } from "../../store";
import InputAddTask from "./InputAddTask";
import InfiniteScroll from "react-infinite-scroll-component";
import TaskDND from "./TaskDND";
interface Props {
  fullDate: { date: number; month: number; year: number };
}
const LIMIT = 8;

const Task = ({ fullDate }: Props): JSX.Element => {
  const dispatch = useDispatch();

  const { email } = useSelector((state: RootState) => state.users);
  const date = `${fullDate.year}/${fullDate.month}/${fullDate.date}`;

  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const isTask = useSelector((state: RootState) => state.tasks.isTask);

  useEffect(() => {
    dispatch(
      taskAction({
        email: email!,
        date,
        page: 1,
        limit: LIMIT,
        isMoveDate: true,
      })
    );
  }, [date, dispatch, email]);
  const fetchMoreData = () => {
    dispatch(
      taskAction({
        email: email!,
        date,
        page: tasks.length / LIMIT + 1,
        limit: LIMIT,
        isMoveDate: false,
      })
    );
  };
  // console.log('re-render');

  return (
    <div className="wrapper-list-item">
      <InfiniteScroll
        dataLength={tasks.length}
        next={fetchMoreData}
        hasMore={isTask}
        loader={
          tasks.length ? (
            <h4 style={{ textAlign: "center" }}>Loading...</h4>
          ) : (
            ""
          )
        }
        className="infinite-scroll"
        style={{ width: "800px", overflow: "none" }}
      >
        <TaskDND tasks={tasks} />
      </InfiniteScroll>
      <div className="add-task">
        <InputAddTask email={email!} date={date} countTasks={tasks.length} />
      </div>
    </div>
  );
};

export default memo(Task);
