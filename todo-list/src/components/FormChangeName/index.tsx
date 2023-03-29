/* eslint-disable react-hooks/exhaustive-deps */
import { Button, InputField } from "@gapo_ui/components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateFullName } from "../../helpers/validator";
import { useInput } from "../../hooks/useInput";
import { RootState } from "../../store";
import { actionChangeName } from "../../store/slices/userSlice";

import "./style.css";

const ChangeName = (): JSX.Element => {
  const { email, username } = useSelector((state: RootState) => state.users);
  const nameState = useInput('',validateFullName);
  

  useEffect(() => {
    if(username) nameState.setValue(username);
  }, [username]);

  const dispatch = useDispatch();

  const onChangeFullName = (e):void => {
    nameState.setValue(e.target.value);
  };
  const handleSaveChangeName = ():void => {
    if (nameState.err() === false && nameState.value.trim() !== username) {
      dispatch(actionChangeName({ email: email!, newName: nameState.value }));
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
          value={nameState.value}
          // defaultValue={username!}
          placeholder={"Enter Full Name"}
          fullWidth
          onChange={onChangeFullName}
          helperText={nameState.helperText}
          error={nameState.isErr}
        />
        <Button
          type="button"
          color="accentWorkPrimary"
          className="btn-save"
          variant="cta"
          onPress={handleSaveChangeName}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangeName;
