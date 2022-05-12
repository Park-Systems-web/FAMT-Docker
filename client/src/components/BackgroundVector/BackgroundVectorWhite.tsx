/* eslint-disable react/require-default-props */
import { Box } from "@mui/material";
import React from "react";
import { BackgroundVectorWhiteContainer } from "./BackgroundVectorStyles";

interface BackgroundVectorProps {
  maxWidth?: string;
  children: React.ReactNode;
}

const BackgroundVectorWhite = ({
  children,
  maxWidth,
}: BackgroundVectorProps) => {
  return (
    <BackgroundVectorWhiteContainer style={{ maxWidth }}>
      {children}
    </BackgroundVectorWhiteContainer>
  );
};

export default BackgroundVectorWhite;
