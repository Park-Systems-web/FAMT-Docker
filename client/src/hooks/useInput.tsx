import { FormEvent, useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  return { value, onChange };
};

export default useInput;
