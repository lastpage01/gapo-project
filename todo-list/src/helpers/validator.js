/* eslint-disable no-useless-escape */
export const isEmpty = (value) => {
  return value.trim()? "" : "can not empty!";
};
export const validateEmail = (value) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const checkValue = isEmpty(value);
  if (checkValue !== "") return checkValue;
  if (!regex.test(value)) return "Invalid email";
  return "";
};

export const validatePassword = (value) => {
  const regex = /^([\@\w\.]){6,20}$/;
  const checkValue = isEmpty(value);
  if (checkValue !== "") return checkValue;
  if (!regex.test(value)) return "Invalid Password ";
  return "";
};

export const validateFullName = (value) => {
  return isEmpty(value);
};

export const checkNameErr = (nameValue, setHelperTextName, setIsErrName) => {
  const errName = validateFullName(nameValue);
  setHelperTextName(errName);
  setIsErrName(!!errName);
  return !!errName;
};

export const checkEmailErr = (
  emailValue,
  setHelperTextEmail,
  setIsErrEmail
) => {
  const errEmail = validateEmail(emailValue);
  setHelperTextEmail(errEmail);
  setIsErrEmail(!!errEmail);
  return !!errEmail;
};

export const checkPassErr = (passValue, setHelperTextPass, setIsErrPass) => {
  const errPassword = validatePassword(passValue);
  setHelperTextPass(errPassword);
  setIsErrPass(!!errPassword);
  return !!errPassword;
};
export function checkErrValidateForm() {
  for (let i = 0; i < arguments.length; i++) if (arguments[i]) return true;
  return false;
}
