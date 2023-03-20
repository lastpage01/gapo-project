import { Button } from "@gapo_ui/components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Calendar from "../../components/Date";
import Task from "../../components/Tasks";
import { deleteTaskAction } from "../../store/slices/taskSlice";

import "./style.css";
const Home = () => {
  const [fullDate, setFullDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [showMessage, setShowMessage] = useState(false);
  const [idRemove, setIdRemove] = useState(null);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowMessage(false);
    setIdRemove(null);
  };
  const handleRemove = () => {
    dispatch(deleteTaskAction(idRemove));
    setShowMessage(false);
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
      {showMessage && (
        <div className="wrapper-message-box">
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
      )}
    </>
  );
};

export default Home;
