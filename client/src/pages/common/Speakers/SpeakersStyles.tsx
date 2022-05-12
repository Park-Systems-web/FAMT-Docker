import styled from "styled-components";

export const SpeakersContainer = styled.div`
  .banner {
    height: 400px;
    background-position: center center;
  }

  .speaker-grid {
    width: 31%;
    &:not(:nth-child(3n)) {
      margin-right: 3%;
    }
  }
  .speaker-card {
    position: relative;
    margin-bottom: 25px;
    min-height: calc(100% - 25px);
    align-items: center;
  }

  @media (max-width: 1024px) {
    .speaker-grid {
      width: 47%;

      &:not(:nth-child(3n)) {
        margin-right: 0;
      }
      &:not(:nth-child(2n)) {
        margin-right: 3%;
      }
    }
  }

  @media (max-width: 1024px) {
    .banner {
      height: 240px;
    }
    .speaker-grid {
      width: 100%;

      &:not(:nth-child(3n)) {
        margin-right: 0;
      }
    }
  }
`;
