import React from "react";
import ChangeName from "../../components/FormChangeName";
import ChangePassword from "../../components/FormChangePassword";
import './style.css'
const Setting = () => {
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
