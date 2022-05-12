/* eslint-disable react/require-default-props */
import { Box } from "@mui/material";
import React from "react";
import { BackgroundVectorColoredContainer } from "./BackgroundVectorStyles";

interface BackgroundVectorProps {
  maxWidth?: string;
  children: React.ReactNode;
}

const BackgroundVectorColored = ({
  children,
  maxWidth,
}: BackgroundVectorProps) => {
  return (
    <BackgroundVectorColoredContainer style={{ maxWidth }}>
      {children}
    </BackgroundVectorColoredContainer>
  );
};

export default BackgroundVectorColored;
