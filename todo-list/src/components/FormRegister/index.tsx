import { Button, InputField, PasswordField } from "@gapo_ui/components";
import React from "react";
import {
  checkErrValidateForm,
  validateEmail,
  validateFullName,
  validatePassword,
} from "../../helpers/validator";
import { useInput } from "../../hooks/useInput";
import { register } from "../../services/users.service";

import "./style.css";

type TypeProps = {
  setAppearSignIn: (val:boolean)=>void;
};

const SignUp = (props: TypeProps): JSX.Element => {
  const emailState = useInput(validateEmail);
  const nameState = useInput(validateFullName);
  const passState = useInput(validatePassword);

  const onChangeEmail = (e) => {
    emailState.setValue(e.target.value);
  };
  const onChangePassword = (e) => {
    passState.setValue(e.target.value);
  };
  const onChangeFullName = (e) => {
    nameState.setValue(e.target.value);
  };

  const handleRegister = async (e) => {
    if (isErr() === false) {
      await register(emailState.Value, passState.Value, nameState.Value)
        .then((data) => {
          alert("Register success");
          props.setAppearSignIn(true);
        })
        .catch((err) => {
          emailState.setHelperText(err.response.data);
          emailState.setIsErr(true);
        });
    }
  };
  const isErr = ():boolean => {
    return checkErrValidateForm(
      emailState.err(),
      passState.err(),
      nameState.err()
    );
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
            helperText={nameState.helperText}
            value={nameState.Value}
            error={nameState.isErr}
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
            helperText={emailState.helperText}
            value={emailState.Value}
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
            helperText={passState.helperText}
            value={passState.Value}
            error={passState.isErr}
          />
        </div>
        <Button
          color="accentPrimary"
          size="medium"
          type="button"
          className="signUp"
          fullWidth
          variant="cta"
          onPress={handleRegister}
        >
          Sign Up
        </Button>
        <div className="back-signIn">
          <p>Already have an account ?</p>
          <p className="back" onClick={() => props.setAppearSignIn(true)}>
            Sign In
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
