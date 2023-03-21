import { useState,useCallback } from "react";
interface UseInput {
  Value: string;
  setValue: (val: string) => void;
  setHelperText: (val: string) => void;
  setIsErr: (val: boolean) => void;
  helperText: string;
  isErr: boolean;
  err: (defineErr?: boolean) => boolean;
  reset: () => void;
}
export const useInput = (
  value: string = "",
  validate?: (value: string) => string
): UseInput => {
  const [Value, setValue] = useState<string>(value);
  const [helperText, setHelperText] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);

  const err = (defineErr?: boolean): boolean => {
    if (defineErr) return !!defineErr;
    if (!validate) return false;
    const errText = validate(Value);
    setHelperText(errText);
    setIsErr(!!errText);
    return !!errText;
  };
  const reset = useCallback(() => {
    setValue("");
    setHelperText("");
    setIsErr(false);
  }, []);

  return {
    Value,
    setValue,
    setHelperText,
    setIsErr,
    helperText,
    isErr,
    err,
    reset,
  };
};
