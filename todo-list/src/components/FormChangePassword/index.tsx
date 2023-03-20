import { Button, PasswordField } from "@gapo_ui/components";
import React from "react";
import { useSelector } from "react-redux";
import {
  checkErrValidateForm,
  isEmpty,
  validatePassword,
} from "../../helpers/validator";
import { useInput } from "../../hooks/useInput";
import { changePassword } from "../../services/users.service";
import { RootState } from "../../store";

import "./style.css";
const ChangePassword = (): JSX.Element => {
  const currentPass = useInput(validatePassword);
  const newPass = useInput(validatePassword);
  const confirmPass = useInput(validatePassword);

  const { email } = useSelector((state: RootState) => state.users);

  const onChangeCurrentPassword = (e) => {
    currentPass.setValue(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    newPass.setValue(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    confirmPass.setValue(e.target.value);
  };

  const handleSaveChangePassword = async (e) => {
    if (isErr() === false) {
      await changePassword(email!, currentPass.Value, newPass.Value)
        .then((data) => {
          alert("Save new password success");
          currentPass.setValue("");
          newPass.setValue("");
          confirmPass.setValue("");
        })
        .catch((e) => {
          currentPass.setHelperText(e.response.data);
          currentPass.setIsErr(true);
        });
    }
  };

  const isErr = ():boolean => {
    if (!currentPass.err() && newPass.Value === currentPass.Value) {
      newPass.setHelperText("Do not duplicate current password");
      newPass.setIsErr(true);
      return newPass.err(true);
    }
    return checkErrValidateForm(
      currentPass.err(),
      newPass.err(),
      checkErrConfirmPass()
    );
  };
  const checkErrConfirmPass = ():boolean => {
    let err = isEmpty(confirmPass.Value);
    if (!err)
      err = confirmPass.Value === newPass.Value ? "" : "Invalid password";
    confirmPass.setHelperText(err);
    confirmPass.setIsErr(!!err);
    return !!err;
  };
  return (
    <div className="wrapper-changePassword">
      <form action="#" className="form-changePassword">
        <p className="title">Change your password</p>
        <div className="wrapper-input">
          <PasswordField
            label={"Current password"}
            placeholder="Enter Current Password"
            className="password"
            fullWidth
            onChange={onChangeCurrentPassword}
            helperText={currentPass.helperText}
            error={currentPass.isErr}
            value={currentPass.Value}
          />
        </div>
        <div className="wrapper-input">
          <PasswordField
            label={"New password"}
            placeholder="Enter New Password"
            className="password"
            fullWidth
            onChange={onChangeNewPassword}
            helperText={newPass.helperText}
            error={newPass.isErr}
            value={newPass.Value}
          />
        </div>
        <div className="wrapper-input">
          <PasswordField
            label={"Confirm new password"}
            placeholder="Enter Password"
            className="password"
            fullWidth
            onChange={onChangeConfirmPassword}
            helperText={confirmPass.helperText}
            error={confirmPass.isErr}
            value={confirmPass.Value}
          />
        </div>
        <Button
          type="button"
          color="accentWorkPrimary"
          className="btn-change"
          onPress={handleSaveChangePassword}
          variant="cta"
        >
          Change
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
