/* eslint-disable no-useless-escape */

export const isEmpty = (value: string): string => {
  return value.trim() ? "" : "can not empty!";
};
export const validateEmail = (value: string): string => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const checkValue = isEmpty(value);
  if (checkValue !== "") return checkValue;
  if (!regex.test(value)) return "Invalid email";
  return "";
};

export const validatePassword = (value: string): string => {
  const regex = /^([\@\w\.]){6,20}$/;
  const checkValue = isEmpty(value);
  if (checkValue !== "") return checkValue;
  if (!regex.test(value)) return "Invalid Password ";
  return "";
};

export const validateFullName = (value: string): string => {
  return isEmpty(value);
};


export function checkErrValidateForm(...errList: boolean[]): boolean {
  for (let i = 0; i < errList.length; i++) if (errList[i]) return true;
  return false;
}
