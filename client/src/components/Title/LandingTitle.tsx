/* eslint-disable react/require-default-props */
import React from "react";
import { useTheme, Box } from "@mui/material";
import { headingFontSize } from "utils/FontSize";
import InnerHTML from "dangerously-set-html-content";

interface LandingTitleProps {
  title: string;
  textAlign?: "center" | "left" | "right";
}

const LandingTitle = ({ title, textAlign = "left" }: LandingTitleProps) => {
  const theme = useTheme();
  return (
    <Box
      fontWeight={theme.typography.fontWeightBold}
      sx={{
        textAlign,
        mb: 3,
        fontSize: headingFontSize,
        // color: theme.palette.primary.darkText,
      }}
    >
      <InnerHTML html={title} />
    </Box>
  );
};

export default LandingTitle;
