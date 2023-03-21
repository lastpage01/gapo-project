import { Button, InputField, PasswordField } from "@gapo_ui/components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import {
  checkErrValidateForm,
  validateEmail,
  validatePassword,
} from "../../helpers/validator";

import { login } from "../../store/slices/userSlice";
import { clearMessage } from "../../store/slices/messageSlice";
import { RootState } from "../../store";
import { useInput } from "../../hooks/useInput";

type Props = {
  setAppearSignIn: (val:boolean)=>void;
};

const SignIn = ({ setAppearSignIn }: Props): JSX.Element => {
  const emailState = useInput('',validateEmail);
  const passwordState = useInput('',validatePassword);

  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.message);

  const handleAppearRegister = () => {
    setAppearSignIn(false);
  };

  const onChangeEmail = (e) => {
    emailState.setValue(e.target.value);
  };
  const onChangePassword = (e) => {
    passwordState.setValue(e.target.value);
  };

  const handleLogin = (e) => {
    if (isErr() === false) {
      dispatch(
        login({ email: emailState.Value, password: passwordState.Value })
      );
    } else {
      dispatch(clearMessage());
    }
  };

  const isErr = () => {
    return checkErrValidateForm(emailState.err(), passwordState.err());
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
            value={emailState.Value}
            helperText={emailState.helperText}
            error={emailState.isErr}
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
            helperText={passwordState.helperText}
            error={passwordState.isErr}
            value={passwordState.Value}
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
          variant="cta"
        >
          Login
        </Button>
        <div className="line"></div>
        <Button
          size="medium"
          type="button"
          className="register"
          variant="cta"
          onPress={handleAppearRegister}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
