import styled from "styled-components";
import { useTheme } from "@mui/material";

interface TitleContainerProps {
  fontSize: number;
}

export const TitleContainer = styled.div<TitleContainerProps>`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  h1 {
    color: ${() => {
      const theme = useTheme();
      return theme.palette.primary.heading;
    }};
    font-size: ${(props) => props.fontSize}px;
    font-weight: 700;
    margin: 0;
  }
`;
