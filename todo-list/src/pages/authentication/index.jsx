import React, { useState } from "react";
import SignIn from "../../components/FormLogin";
import SignUp from "../../components/FormRegister";
import "./style.css";

const Authentication = () => {
  const [appearSignIn, setAppearSignIn] = useState(true);
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
