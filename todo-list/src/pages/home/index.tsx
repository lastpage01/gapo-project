import { Button } from "@gapo_ui/components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import Calendar from "../../components/Date";
import Task from "../../components/Tasks";
import { deleteTaskAction } from "../../store/slices/taskSlice";

import "./style.css";

export const HomeContext = React.createContext<any>({});

const Home = () => {
  const [fullDate, setFullDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const location = useLocation() ;
  console.log(location);
  
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [idRemove, setIdRemove] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowMessage(false);
    setIdRemove(null);
  };
  const handleRemove = () => {
    console.log(idRemove);

    dispatch(deleteTaskAction(idRemove!));
    setShowMessage(false);
  };
  return (
    <HomeContext.Provider value={{setShowMessage, setIdRemove}}>
      <div className="home-container">
        <div className="wrapper-time">
          <Calendar setFullDate={setFullDate} />
        </div>
        <div className="wrapper-task">
          <Task
            fullDate={fullDate}
          />
        </div>
      </div>
      {showMessage && (
        <div className="wrapper-message-box">
          <div className="message-box">
            <h2>Remove this task?</h2>
            <p>This action can not be undone</p>
            <div className="btn">
              <Button color="bgPrimary" onPress={handleCancel} variant={"cta"}>
                Cancel
              </Button>
              <Button color="bgPrimary" onPress={handleRemove} variant={"cta"}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </HomeContext.Provider>
  );
};

export default Home;
