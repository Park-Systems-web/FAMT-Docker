import styled from "styled-components";
import { useTheme } from "@mui/material";

export const SpeakerImageContainer = styled.div`
  position: relative;

  .speaker-image {
    object-fit: cover;
    width: 200px;
    height: 200px;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: ${() => {
      const theme = useTheme();
      return theme.palette.primary.overlay;
    }};
  }
`;
