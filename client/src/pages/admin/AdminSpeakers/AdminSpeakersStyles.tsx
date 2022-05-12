import styled from "styled-components";

export const AdminSpeakerContainer = styled.div`
  .speaker-grid {
    width: 31%;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: translateY(-10px);
    }
    &:not(:nth-child(3n)) {
      margin-right: 3%;
    }

    .speaker-card {
      margin-bottom: 25px;
      min-height: calc(100% - 25px);
      align-items: center;

      .speaker-image {
        object-fit: cover;
        height: 300px;
        margin: 20px 0;
      }

      .belong {
        color: #7c7c7c;
      }
    }

    .belong {
      color: #7c7c7c;
    }
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
    .speaker-grid {
      width: 100%;

      &:not(:nth-child(3n)) {
        margin-right: 0;
      }
    }
  }
`;
