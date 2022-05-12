import styled from "styled-components";
import { useTheme } from "@mui/material";

export const NavBarContainer = styled.div`
  width: 100%;
  height: 110px;
  border-bottom: ${() => {
    const theme = useTheme();
    return `3px solid ${theme.palette.background.default}`;
  }};
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: ${() => {
    const theme = useTheme();
    return theme.palette.background.default;
  }};
  box-shadow: 0 3px 6px #0000001c;

  .overlay {
    background: #0000001b;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0s linear 1s;
  }
  .nav-wrap {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    .menu-container {
      align-self: flex-end;
    }
    .logo-link {
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 131px;
      // width: 25%;
      // height: 100%;
      img {
        // width: 100%;
        // height: 100%;
        height: 85px;
        padding: 20px 0;
        margin-top: 13px;
        margin-right: 10px;
      }
      &.disabled {
        pointer-events: none;
      }
    }
    .user-menu-wrap {
      display: flex;
      margin-left: 20px;
    }

    .menu-item-wrap {
      // width: 50%;
    }

    .login-wrap {
      width: 20%;
    }

    .mobile-menu-btn {
      display: none;
      height: 40px;
    }
  }

  .return-main-btn {
    top: 50%;
    transform: translateY(-50%);
  }

  @media screen and (max-width: 1140px) {
    height: 70px;

    .return-main-btn {
      svg {
        width: 0.8em;
        height: 0.8em;
      }
    }

    .nav-wrap {
      .menu-container {
        position: absolute;
        top: 67px;
        width: 100%;
        max-height: 0px;
        overflow: hidden;
        z-index: 10;
        transition: max-height 0.5s ease-in-out;
        .menu-item-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          width: 100%;
          max-height: 100vh;
          box-shadow: 0px 2px 2px #0000002b;
          padding: 0 20px;
          box-sizing: border-box;
          div {
            transform: scale(1.1) translateY(-15px);
            transition: transform 0.8s ease-in-out;
          }
        }
      }
      .mobile-menu-btn {
        display: inline-block;
        position: absolute;
        right: 0;
      }
      .logo-link {
        img {
          margin: 0;
          height: 73px;
        }
      }
      .user-menu-wrap {
        margin-left: 0;
        width: 100%;
        justify-content: flex-end;
        .user-menu {
          margin-right: auto;
        }
      }

      // mobile
    }
    &.mobile {
      .menu-container {
        max-height: 100vh;
        .menu-item-wrap {
          div {
            transform: none;
          }
        }
      }
      .overlay {
        visibility: visible;
        opacity: 1;
        transition-delay: 0s;
      }
    }
    .login-wrap {
      align-self: initial;

      button:not(.user-menu) {
        display: none;
      }
    }
  }
`;
