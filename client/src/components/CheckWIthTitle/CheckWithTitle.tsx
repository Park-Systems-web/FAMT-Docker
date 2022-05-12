import React, { ChangeEvent } from "react";
import { Checkbox } from "@mui/material";
import { CheckWithTitleContainer } from "./CheckWithTitleStyles";

interface CheckWithTitleProps {
  onChange: (checked: boolean, item: Program.programType) => void;
  item: Program.programType;
  programCheckedList: Program.programType[];
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CheckWithTitle = ({
  onChange,
  item,
  programCheckedList,
}: CheckWithTitleProps) => {
  return (
    <CheckWithTitleContainer>
      <Checkbox
        {...label}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          console.log("바뀌어요");
          onChange(e.target.checked, item);
        }}
        checked={programCheckedList && programCheckedList.includes(item)}
      />
      {item.title}
    </CheckWithTitleContainer>
  );
};

export default CheckWithTitle;
