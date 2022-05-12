/* eslint-disable react/require-default-props */
import { Box } from "@mui/material";
import React from "react";
import { BackgroundVectorColoredReversedContainer } from "./BackgroundVectorStyles";

interface BackgroundVectorProps {
  maxWidth?: string;
  children: React.ReactNode;
}

const BackgroundVectorColoredReversed = ({
  children,
  maxWidth,
}: BackgroundVectorProps) => {
  return (
    <BackgroundVectorColoredReversedContainer style={{ maxWidth }}>
      {children}
    </BackgroundVectorColoredReversedContainer>
  );
};

export default BackgroundVectorColoredReversed;
