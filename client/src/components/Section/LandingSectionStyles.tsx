import styled from "styled-components";
import { useTheme } from "@mui/material";

export const LandingSectionContainer = styled.div`
  background-size: cover;
  background-position: center;

  .gradient-box {
    background: ${() => {
      const theme = useTheme();
      return theme.palette.primary.verticalGradation;
    }};
  }

  &.fullWidth {
    width: 100%;
  }
  // overlay
  &.section1 {
    position: relative;
  }
  .overlay {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .overlay.primary {
    background: ${() => {
      const theme = useTheme();
      return theme.palette.primary.overlay;
    }};
  }
  .overlay.secondary {
    background: ${() => {
      const theme = useTheme();
      return theme.palette.secondary.overlay;
    }};
  }
  .overlay.bluescale {
    background: #2ba4dd52;
  }
`;

// transition: background-color 0.2s ease-in-out;
// padding: 15px 10px;
// &.primary {
//   color: ${() => {
//     const theme = useTheme();
//     return theme.palette.text.primary;
//   }};
//   &:hover {
//     background-color: rgba(33, 173, 229, 0.04);
//   }
//   &:active {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
// }
// &.gradient {
//   background: ${() => {
//     const theme = useTheme();
//     return theme.palette.primary.gradation;
//   }};
//   border: 2px solid #fff;
//   border-radius: 25px;
//   padding: 2px 12px;
// }
// display: flex;
// align-items: center;
