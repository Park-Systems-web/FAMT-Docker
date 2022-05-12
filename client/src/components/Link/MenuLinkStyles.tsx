import styled from "styled-components";
import { useTheme } from "@mui/material";

export const MenuLinkContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${() => {
    const theme = useTheme();
    return theme.typography.fontWeightBold;
  }};
  a {
    position: relative;
    &.active {
      color: ${() => {
        const theme = useTheme();
        return theme.palette.text.primary;
      }};
      cursor: default;
    }
    &::before {
      content: "";
      position: absolute;
      width: calc(100% - 20px);
      top: 5px;
      height: 3px;
      background-color: transparent;
      transition: background-color 0.2s ease-in-out;
    }
    &.active::before,
    &:hover::before {
      background-color: ${() => {
        const theme = useTheme();
        return theme.palette.primary.main;
      }};
    }
  }

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  @media screen and (max-width: 1024px) {
    a {
      &::before {
        width: calc(100% - 10px);
      }
    }
  }
`;
