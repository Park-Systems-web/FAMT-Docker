import { Typography, useTheme } from "@mui/material";
import usePageViews from "hooks/usePageViews";
import React from "react";
import { headingFontSize } from "utils/FontSize";
import { globalData } from "utils/GlobalData";
import { ComingSoonContainer } from "./ComingSoonStyles";

const ComingSoon = () => {
  const theme = useTheme();
  const pathname = usePageViews();
  const { comingSoonText } = globalData.get(pathname) as Common.globalDataType;
  return (
    <ComingSoonContainer>
      <Typography
        fontSize={headingFontSize}
        fontWeight={600}
        letterSpacing={1.5}
      >
        {comingSoonText || "We're Coming Soon!"}
      </Typography>
    </ComingSoonContainer>
  );
};

export default ComingSoon;
