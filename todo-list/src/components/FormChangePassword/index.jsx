import { Button, PasswordField } from "@gapo_ui/components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  checkErrValidateForm,
  checkPassErr,
  isEmpty,
} from "../../helpers/validator";
import { changePassword } from "../../services/users.service";

import "./style.css";
const ChangePassword = () => {
  const [currentPassValue, setCurrentPassValue] = useState("");
  const [helperTextCurrentPass, setHelperTextCurrentPass] = useState("");
  const [isErrCurrentPass, setIsErrCurrentPass] = useState(false);

  const [newPassValue, setNewPassValue] = useState("");
  const [helperTextNewPass, setHelperTextNewPass] = useState("");
  const [isErrNewPass, setIsErrNewPass] = useState(false);

  const [confirmPassValue, setConfirmPassValue] = useState("");
  const [helperTextConfirmPass, setHelperTextConfirmPass] = useState("");
  const [isErrConfirmPass, setIsErrConfirmPass] = useState(false);

  const { email } = useSelector((state) => state.users);

  const onChangeCurrentPassword = (e) => {
    setCurrentPassValue(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassValue(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassValue(e.target.value);
  };

  const handleSaveChangePassword = (e) => {
    if (isErr() === false) {
      changePassword(email, currentPassValue, newPassValue)
        .then((data) => {
          alert("Save new password success");
          setCurrentPassValue("");
          setNewPassValue("");
          setConfirmPassValue("");
        })
        .catch((e) => {
          setHelperTextCurrentPass(e.response.data);
          setIsErrCurrentPass(true);
        });
    }
  };

  const isErr = () => {
    const newPassErr = checkPassErr(
      newPassValue,
      setHelperTextNewPass,
      setIsErrNewPass
    );
    let currentPassword = checkPassErr(
      currentPassValue,
      setHelperTextCurrentPass,
      setIsErrCurrentPass
    );
    const confirmPassErr = checkErrConfirmPass();
    if (!currentPassword && newPassValue === currentPassValue) {
      currentPassword = true;
      setHelperTextNewPass("Do not duplicate current password");
      setIsErrNewPass(true);
    }
    return checkErrValidateForm(newPassErr, confirmPassErr, currentPassword);
  };
  const checkErrConfirmPass = () => {
    let err = isEmpty(confirmPassValue);
    if (!err) err = confirmPassValue === newPassValue ? "" : "Invalid password";
    setHelperTextConfirmPass(err);
    setIsErrConfirmPass(!!err);
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
            helperText={helperTextCurrentPass}
            error={isErrCurrentPass}
            value={currentPassValue}
          />
        </div>
        <div className="wrapper-input">
          <PasswordField
            label={"New password"}
            placeholder="Enter New Password"
            className="password"
            fullWidth
            onChange={onChangeNewPassword}
            helperText={helperTextNewPass}
            error={isErrNewPass}
            value={newPassValue}
          />
        </div>
        <div className="wrapper-input">
          <PasswordField
            label={"Confirm new password"}
            placeholder="Enter Password"
            className="password"
            fullWidth
            onChange={onChangeConfirmPassword}
            helperText={helperTextConfirmPass}
            error={isErrConfirmPass}
            value={confirmPassValue}
          />
        </div>
        <Button
          type="button"
          color="accentWorkPrimary"
          className="btn-change"
          onPress={handleSaveChangePassword}
        >
          Change
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
