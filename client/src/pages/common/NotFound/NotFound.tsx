import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { headingFontSize } from "utils/FontSize";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import NSSButton from "components/Button/NSSButton";

const NotFound = () => {
  return (
    <Stack
      className="body-fit"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box>
        <AnnouncementIcon fontSize="large" />
        <Typography fontSize={headingFontSize} fontWeight={700}>
          Page not found.
        </Typography>
      </Box>
      <NSSButton
        variant="gradient"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Back to Home
      </NSSButton>
    </Stack>
  );
};

export default NotFound;
