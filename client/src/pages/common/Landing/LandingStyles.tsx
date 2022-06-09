import styled from "styled-components";
import { useTheme } from "@mui/material";

export const LandingContainer = styled.div`
  .edit-btn,
  .sponsor-edit-btn {
    position: absolute;
    color: ${() => {
      const theme = useTheme();
      return theme.palette.primary.main;
    }};
    margin: 8px;
    transform: translateX(-150%);
    border: 1px solid #f37a2b42;
  }

  .sponsor-edit-btn {
    transform: translateX(-30px);
    margin: 0;
  }
`;
