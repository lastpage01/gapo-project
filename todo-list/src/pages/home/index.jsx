import { Button } from "@gapo_ui/components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Calendar from "../../components/Date";
import Task from "../../components/Tasks";
import { deleteTaskAction } from "../../store/actions/tasks";

import "./style.css";
const Home = (props) => {
  const [fullDate, setFullDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [showMessage, setShowMessage] = useState("none");
  const [idRemove, setIdRemove] = useState(null);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowMessage("none");
  };
  const handleRemove = () => {
    dispatch(deleteTaskAction(idRemove));
    setShowMessage("none");
  };
  return (
    <>
      <div className="home-container">
        <div className="wrapper-time">
          <Calendar setFullDate={setFullDate} />
        </div>
        <div className="wrapper-task">
          <Task
            fullDate={fullDate}
            setShowMessage={setShowMessage}
            setIdRemove={setIdRemove}
          />
        </div>
      </div>
      <div className="wrapper-message-box" style={{ display: showMessage }}>
        <div className="message-box">
          <h2>Remove this task?</h2>
          <p>This action can not be undone</p>
          <div className="btn">
            <Button color="bgPrimary" onPress={handleCancel}>
              Cancel
            </Button>
            <Button color="bgPrimary" onPress={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
