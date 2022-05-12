import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

const useSelect = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  return { value, onChange };
};

export default useSelect;
