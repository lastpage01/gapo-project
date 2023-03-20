import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignIn from "../../components/FormLogin";
import SignUp from "../../components/FormRegister";
import { RootState } from "../../store";
import { isLogin } from "../../helpers/authentication";

import "./style.css";

const Authentication = () => {
  const [appearSignIn, setAppearSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector((state:RootState) => state.users);
  useEffect(() => {
    if (isLogin(dispatch)) navigator("/home");
  }, [dispatch, isLoggedIn, navigator]);

  return (
    <>
      <div className="wrapper-SignInSignUp">
        {appearSignIn === true ? (
          <SignIn setAppearSignIn={setAppearSignIn} />
        ) : (
          <SignUp setAppearSignIn={setAppearSignIn} />
        )}
      </div>
    </>
  );
};

export default Authentication;
