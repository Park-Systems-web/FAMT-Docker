import React from "react";
import { CircularProgress } from "@mui/material";
import { LoadingContainer } from "./LoadingStyles";

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;
