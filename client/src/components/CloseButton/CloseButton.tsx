import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CloseButtonContainer } from "./CloseButtonStyles";

interface CloseButtonProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CloseButton = ({ setOpen }: CloseButtonProps) => {
  return (
    <CloseButtonContainer
      type="button"
      onClick={() => {
        setOpen(false);
      }}
    >
      <CloseIcon />
    </CloseButtonContainer>
  );
};
export default CloseButton;
