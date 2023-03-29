import React from "react";
import { useLocation } from "react-router";
import ChangeName from "../../components/FormChangeName";
import ChangePassword from "../../components/FormChangePassword";
import './style.css'
const Setting = () => {
  const location = useLocation() ;
  console.log(location);
  return (
    <div className="wrapper-setting">
      <div className="content-setting">
        <ChangeName />
        <div className="line" />
        <ChangePassword/>
      </div>
    </div>
  );
};

export default Setting;
