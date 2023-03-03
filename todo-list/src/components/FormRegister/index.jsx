import { Button, InputField, PasswordField } from "@gapo_ui/components";
import React, { useState } from "react";
import {
  checkEmailErr,
  checkErrValidateForm,
  checkNameErr,
  checkPassErr,
} from "../../helpers/validator";
import { register } from "../../services/users.service";

import "./style.css";
const SignUp = ({ setAppearSignIn }) => {
  const [emailValue, setEmailValue] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [isErrEmail, setIsErrEmail] = useState(false);

  const [passValue, setPassValue] = useState("");
  const [helperTextPass, setHelperTextPass] = useState("");
  const [isErrPass, setIsErrPass] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [helperTextName, setHelperTextName] = useState("");
  const [isErrName, setIsErrName] = useState(false);

  const handleAppearLogin = () => {
    setAppearSignIn(true);
  };

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassValue(e.target.value);
  };

  const onChangeFullName = (e) => {
    setNameValue(e.target.value);
  };

  const handleRegister = (e) => {
    if (isErr() === false) {
      const user = {
        email: emailValue,
        password: passValue,
        fullName: nameValue,
      };
      register(user)
        .then((data) => {
          alert("Register success");
          handleAppearLogin();
        })
        .catch((err) => {
          setHelperTextEmail(err.response.data);
          setIsErrEmail(true);
        });
    }
  };
  const isErr = () => {
    const errName = checkNameErr(nameValue, setHelperTextName, setIsErrName);
    const errEmail = checkEmailErr(
      emailValue,
      setHelperTextEmail,
      setIsErrEmail
    );
    const errPass = checkPassErr(passValue, setHelperTextPass, setIsErrPass);
    return checkErrValidateForm(errName, errEmail, errPass);
  };
  return (
    <div className="wrapper-signUp">
      <form action="#" className="form-register">
        <p className="title">Sign Up</p>
        <div className="wrapper-input">
          <InputField
            label={"Full Name"}
            variant="outlined"
            placeholder="Enter Full Name"
            className="fullName"
            fullWidth
            helperText={helperTextName}
            value={nameValue}
            error={isErrName}
            onChange={onChangeFullName}
          />
        </div>
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
        <Button
          color="accentPrimary"
          size="medium"
          type="button"
          className="signUp"
          fullWidth
          onPress={handleRegister}
        >
          Sign Up
        </Button>
        <div className="back-signIn">
          <p>Already have an account ?</p>
          <p className="back" onClick={handleAppearLogin}>
            Sign In
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
