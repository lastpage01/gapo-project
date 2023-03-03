import { Button, InputField, PasswordField } from "@gapo_ui/components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaFacebookF } from "react-icons/fa";
// import { AiOutlineTwitter } from "react-icons/ai";
// import { IoLogoGoogleplus } from "react-icons/io";

import "./style.css";
import {
  checkEmailErr,
  checkErrValidateForm,
  checkPassErr,
} from "../../helpers/validator";

import { login } from "../../store/actions/users";
import { clearMessage } from "../../store/actions/messages";

const SignIn = ({ setAppearSignIn }) => {
  const [emailValue, setEmailValue] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [isErrEmail, setIsErrEmail] = useState(false);

  const [passValue, setPassValue] = useState("");
  const [helperTextPass, setHelperTextPass] = useState("");
  const [isErrPass, setIsErrPass] = useState(false);

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state);

  const handleAppearRegister = () => {
    setAppearSignIn(false);
  };
  
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassValue(e.target.value);
  };

  const handleLogin = (e) => {
    if (isErr() === false) {
      dispatch(login(emailValue, passValue));
    } else {
      dispatch(clearMessage());
    }
  };

  const isErr = () => {
    const errEmail = checkEmailErr(
      emailValue,
      setHelperTextEmail,
      setIsErrEmail
    );
    const errPass = checkPassErr(passValue, setHelperTextPass, setIsErrPass);
    return checkErrValidateForm(errEmail, errPass);
  };
  return (
    <div className="wrapper-signIn">
      <form action="#" className="form-login">
        <p className="title">Sign In</p>
        <div className="wrapper-input">
          <InputField
            label={"Email"}
            variant="outlined"
            placeholder="Enter Email"
            className="email"
            fullWidth
            onChange={onChangeEmail}
            value={emailValue}
            helperText={helperTextEmail}
            error={isErrEmail}
          />
        </div>
        <div className="wrapper-input">
          <PasswordField
            label={"Password"}
            variant="outlined"
            placeholder="Enter Password"
            className="password"
            fullWidth
            onChange={onChangePassword}
            helperText={helperTextPass}
            error={isErrPass}
            value={passValue}
          />
        </div>
        <div style={{ color: "red", marginBottom: "10px" }}>{message}</div>
        <Button
          onPress={handleLogin}
          color="accentPrimary"
          size="medium"
          type="button"
          className="login"
          fullWidth
        >
          Login
        </Button>
        <div className="line"></div>
        {/* <div className="browser">
          <div className="browser-fb">
            <FaFacebookF />
            <span>Facebook</span>
          </div>
          <div className="browser-tw">
            <AiOutlineTwitter />
            <span>Twitter</span>
          </div>
          <div className="browser-gg">
            <IoLogoGoogleplus />
            <span>Google</span>
          </div>
        </div> */}
        <Button
          size="medium"
          type="button"
          className="register"
          onPress={handleAppearRegister}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
