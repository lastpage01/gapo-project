import { Button, InputField } from "@gapo_ui/components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkErrValidateForm, checkNameErr } from "../../helpers/validator";
import { actionChangeName } from "../../store/actions/users";

import "./style.css";

const ChangeName = () => {
  const [nameValue, setNameValue] = useState("");
  const [helperTextName, setHelperTextName] = useState("");
  const [isErrName, setIsErrName] = useState(false);

  const dispatch = useDispatch();
  const { email, user } = useSelector((state) => state.users);

  useEffect(() => {
    setNameValue(user);
  }, [user]);

  const onChangeFullName = (e) => {
    setNameValue(e.target.value);
  };
  const handleSaveChangeName = () => {
    const errName = checkNameErr(nameValue, setHelperTextName, setIsErrName);
    if (checkErrValidateForm(errName) === false && nameValue !== user) {
      dispatch(actionChangeName(email, nameValue));
      alert("change name success");
    }
  };
  return (
    <div className="wrapper-changeName">
      <form action="#" className="form-changName">
        <p className="title">Personal Information</p>
        <InputField
          className="input-changeName"
          type={"text"}
          label={"Full Name"}
          value={nameValue}
          placeholder={"Enter Full Name"}
          fullWidth
          onChange={onChangeFullName}
          helperText={helperTextName}
          error={isErrName}
        />
        <Button
          type="button"
          color="accentWorkPrimary"
          className="btn-save"
          onPress={handleSaveChangeName}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangeName;
