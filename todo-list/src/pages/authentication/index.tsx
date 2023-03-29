import React, { useState } from "react";
import { Navigate } from "react-router";
import SignIn from "../../components/FormLogin";
import SignUp from "../../components/FormRegister";
import "./style.css";
const Authentication = () => {
  const [appearSignIn, setAppearSignIn] = useState(true);
  const auth  = JSON.parse(localStorage.getItem('token')!);
    if(auth) return <Navigate to={'/'}/>
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
