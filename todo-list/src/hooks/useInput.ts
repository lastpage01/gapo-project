import { useState } from "react";
interface UseInput {
  Value: string;
  setValue: (val: string) => void;
  setHelperText: (val: string) => void;
  setIsErr: (val: boolean) => void;
  helperText: string;
  isErr: boolean;
  err: (defineErr?: boolean) => boolean;
}
export const useInput = (validate: (value: string) => string): UseInput => {
  const [Value, setValue] = useState("");
  const [helperText, setHelperText] = useState("");
  const [isErr, setIsErr] = useState(false);

  const err = (defineErr?: boolean): boolean => {
    if (defineErr) return !!defineErr;
    const errText = validate(Value);
    setHelperText(errText);
    setIsErr(!!errText);
    return !!errText;
  };

  return { Value, setValue, setHelperText, setIsErr, helperText, isErr, err };
};
