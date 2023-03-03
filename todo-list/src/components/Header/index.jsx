import React, { useEffect, useState } from "react";
import { Avatar } from "@gapo_ui/components";
import { IoMdSettings } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/actions/users";
import { isLogin } from "../../helpers/authentication";
const Header = (props) => {
  const [disable, setDisable] = useState("none");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isLogin(dispatch)) {
      navigator("/");
    }
  }, [dispatch, isLoggedIn, navigator]);
  const handleEventDisplay = () => {
    setDisable((prev) => {
      return prev === "none" ? "grid" : "none";
    });
  };
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="wrapper-header">
      <Link to={"/home"} className="wrapper-header-left">
        {props.icon}
        <span className="title">{props.title}</span>
      </Link>
      <div className="wrapper-header-right">
        <span className="name">Hi! {user}</span>
        <div className={"avatar"} onClick={handleEventDisplay}>
          <Avatar
            src="https://via.placeholder.com/80"
            size={32}
            alt="icon-80"
          />
        </div>
        <div className="user" style={{ display: `${disable}` }}>
          <Link to={"/setting"} className="setting">
            <IoMdSettings size={20} />
            <span>Setting</span>
          </Link>
          <div className="line" />
          <Link to={"/"} className="signUp" onClick={handleLogOut}>
            <BiLogIn size={20} />
            <span> Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
