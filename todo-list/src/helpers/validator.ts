/* eslint-disable no-useless-escape */
interface Validate {
  errText: string;
  isErr: boolean;
}

export const isEmpty = (value: string): Validate => {
  return value.trim()
    ? { errText: "", isErr: false }
    : { errText: "can not empty!", isErr: true };
};
export const validateEmail = (value: string): Validate => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {errText,isErr} = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value)) return { errText: "Invalid email", isErr: true };
  return { errText: "", isErr: false };
};

export const validatePassword = (value: string): Validate => {
  const regex = /^([\@\w\.]){6,20}$/;
  const {errText,isErr} = isEmpty(value);
  if (isErr) return { errText: errText, isErr: true };
  if (!regex.test(value)) return { errText: "Invalid email", isErr: true };
  return { errText: "", isErr: false };
};

export const validateFullName = (value: string): Validate => {
  return isEmpty(value).isErr
    ? { errText: isEmpty(value).errText, isErr: true }
    : { errText: "", isErr: false };
};

export function checkErrValidateForm(...errList: boolean[]): boolean {
  for (let i = 0; i < errList.length; i++) if (errList[i]) return true;
  return false;
}
