import styled from "styled-components";
import { useTheme } from "@mui/material";
import { globalData } from "utils/GlobalData";

export const RegistrationContainer = styled.div`
  .mktoForm {
    margin: 0 auto;
    font-family: "Open Sans" !important;
    max-width: 591px !important;
    width: initial !important;

    .mktoField {
      background-color: white;
      border: 1px solid #ddd;
    }
  }
  .banner {
    background-image: ${() => {
      const { registrationBannerDesktopURL } = globalData.get(
        "common",
      ) as Common.globalDataType;
      return `url("${registrationBannerDesktopURL}")`;
    }};
    background-size: cover;
    .banner-img {
      margin-left: 30px;
      height: 80px;
      left: 100px;
      position: relative;
    }
  }
  .flex-reverse {
    display: flex;
    flex-direction: row-reverse;
  }
  .paypal-container {
    width: 200px;
    margin: 0 auto;
  }

  .validation-msg {
    font-size: 12px;
    font-weight: 500;

    &.valid {
      color: green;
    }
    &.invalid {
      color: #d20000;
    }
  }

  .mktoLabel {
    color: ${() => {
      const theme = useTheme();
      return theme.palette.text.primary;
    }} !important;

    a {
      padding: 0;
    }
  }
  // step
  .step-container {
    width: 40%;
    min-width: 200px;
    margin: 0 auto 60px auto;
    .step-caption {
      transform: translateX(-40%);
      width: 150px;
      text-align: center;
      color: rgba(0, 0, 0, 0.5);

      &.active {
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .step-icon {
      font-size: 40px;
      margin: -5px;
      color: rgba(0, 0, 0, 0.3);
      &.active {
        color: ${() => {
          const theme = useTheme();
          return theme.palette.primary.main;
        }};
      }
    }

    .icon-divider {
      height: 3px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      &.active {
        background-color: ${() => {
          const theme = useTheme();
          return theme.palette.primary.main;
        }};
      }
    }
  }

  // reset
  .mktoForm input[type="text"],
  .mktoForm input[type="url"],
  .mktoForm input[type="email"],
  .mktoForm input[type="tel"],
  .mktoForm input[type="number"],
  .mktoForm input[type="date"],
  .mktoForm select.mktoField,
  .mktoForm textarea.mktoField,
  .mktoForm input[type="checkbox"] + label:before,
  .mktoForm input[type="radio"] + label:before {
    box-shadow: none;
  }

  .mktoLogicalField.mktoCheckboxList.mktoHasWidth {
    width: initial !important;
  }
  #LblpsmktOptin,
  #LblpsOptin {
    max-width: 590px !important;
    width: initial !important;
  }

  .mktoButton2 {
    margin: 0 auto;
    transition: opacity 0.3s ease-in-out;
    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  &.loading form {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    .banner {
      background-image: ${() => {
        const { registrationBannerMobileURL } = globalData.get(
          "common",
        ) as Common.globalDataType;
        return `url("${registrationBannerMobileURL}")`;
      }};
      background-position: right;
      .banner-img {
        height: 40px;
        top: 30px;
        left: 0;
      }
    }
    .step-caption {
      // display: none;
      &.caption2 {
        transform: translate(-40%, -320%);
      }
    }
  }
`;

export const PayPalContainer = styled.div``;

export const MktoFormContainer = styled.div``;
