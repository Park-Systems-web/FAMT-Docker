import styled from "styled-components";
import { useTheme } from "@mui/material";

export const GradientLinkContainer = styled.button`
  height: 30px;
  background: ${() => {
    const theme = useTheme();
    return theme.palette.primary.gradation;
  }};
  border: 2px solid #fff;
  border-radius: 25px;
  padding: 2px 12px;
  display: flex;
  align-items: center;
  align-self: center;
`;
