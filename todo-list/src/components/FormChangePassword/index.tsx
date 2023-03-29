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
  const currentPass = useInput("", validatePassword);
  const newPass = useInput("", validatePassword);
  const confirmPass = useInput("", validatePassword);

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
      await changePassword(email!, currentPass.value, newPass.value)
        .then((data) => {
          alert("Save new password success");
          currentPass.reset();
          newPass.reset();
          confirmPass.reset();
        })
        .catch((e) => {
          currentPass.setHelperText(e.response.data);
          currentPass.setIsErr(true);
        });
    }
  };

  const isErr = (): boolean => {
    if (!currentPass.err() && newPass.value === currentPass.value) {
      newPass.setHelperText("Do not duplicate current password");
      newPass.setIsErr(true);
      return true;
    }
    return checkErrValidateForm(
      currentPass.err(),
      newPass.err(),
      checkErrConfirmPass()
    );
  };
  const checkErrConfirmPass = (): boolean => {
    let err = isEmpty(confirmPass.value).errText;
    if (!err)
      err = confirmPass.value === newPass.value ? "" : "Invalid password";
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
            value={currentPass.value}
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
            value={newPass.value}
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
            value={confirmPass.value}
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
