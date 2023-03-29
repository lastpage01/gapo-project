import { useState, useCallback } from "react";
interface UseInput {
  value: string;
  setValue: (val: string) => void;
  setHelperText: (val: string) => void;
  setIsErr: (val: boolean) => void;
  helperText: string;
  isErr: boolean;
  err: () => boolean;
  reset: () => void;
}
export const useInput = (
  inputValue: string = "",
  validate?: (value: string) => { errText: string; isErr: boolean }
): UseInput => {
  const [value, setValue] = useState<string>(inputValue);
  const [helperText, setHelperText] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);

  const err = useCallback(() => {
    if (!validate) return false;
    const {errText,isErr} = validate(value);
    setHelperText(errText);
    setIsErr(!!errText);
    return isErr;
  }, [value, validate]);

  const reset = useCallback(() => {
    setValue("");
    setHelperText("");
    setIsErr(false);
  }, []);

  return {
    value,
    setValue,
    setHelperText,
    setIsErr,
    helperText,
    isErr,
    err,
    reset,
  };
};
