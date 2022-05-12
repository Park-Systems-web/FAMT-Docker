import styled from "styled-components";

export const LandingNationCardContainer = styled.button`
  text-align: center;
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .card-wrap {
    .card-image-container {
      position: relative;
      .card-background {
        filter: grayscale(1);
        transition: filter 0.2s ease-in-out;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
      }
      .overlay.bluescale {
        transition: background-color 0.2s ease-in-out;
      }
    }
    &:hover {
      .card-background {
        filter: grayscale(0);
      }
      .overlay.bluescale {
        background-color: #00000000;
      }
    }
  }

  margin-bottom: 15px;
  @media screen and (min-width: 0px) {
    width: 80%;
    &:not(:nth-child(3n)) {
      margin-right: 0;
    }
    &:not(:nth-child(2n)) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 23%;
    &:not(:nth-child(2n)) {
      margin-right: 0;
    }
    &:not(:nth-child(3n)) {
      margin-right: 50px;
    }
  }
`;
