/* eslint-disable react/require-default-props */
import React from "react";
import { useTheme, Box } from "@mui/material";
import { headingFontSize } from "utils/FontSize";

interface LandingTitleProps {
  title: string;
  textAlign?: "center" | "left" | "right";
}

const LandingTitle = ({ title, textAlign = "left" }: LandingTitleProps) => {
  const theme = useTheme();
  return (
    <Box
      fontWeight={theme.typography.fontWeightBold}
      sx={{ textAlign, mb: 3, fontSize: headingFontSize }}
    >
      {title}
    </Box>
  );
};

export default LandingTitle;
