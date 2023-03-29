import React, { useState, useEffect } from "react";
import { Avatar } from "@gapo_ui/components";
import { IoMdSettings } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { logout } from "../../store/slices/userSlice";

import { RootState } from "../../store";
type Props = {
  title: string;
  icon: JSX.Element | null;
};
const Header = (props: Props): JSX.Element => {
  const [disable, setDisable] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.users);

  const handleEventDisplay = () => {
    setDisable((prev) => {
      return prev ? false : true;
    });
  };
  const handleEventDisplayNone = () => {
    setDisable(false);
  };
  const handleLogOut = () => {
    dispatch(logout());
  };
  useEffect(() => {}, []);
  return (
    <div className="wrapper-header">
      <Link
        to={"/"}
        className="wrapper-header-left"
        onClick={handleEventDisplayNone}
      >
        {props.icon}
        <span className="title">{props.title}</span>
      </Link>
      <div className="wrapper-header-right">
        <span className="name">Hi! {username}</span>
        <div className={"avatar"} onClick={handleEventDisplay}>
          <Avatar
            src="https://via.placeholder.com/80"
            size={32}
            alt="icon-80"
          />
        </div>
        {disable && (
          <div className="user">
            <Link
              to={"/setting"}
              className="setting"
              onClick={handleEventDisplay}
            >
              <IoMdSettings size={20} />
              <span>Setting</span>
            </Link>
            <div className="line" />
            <Link to={"/login"} className="signUp" onClick={handleLogOut}>
              <BiLogIn size={20} />
              <span> Sign Out</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
