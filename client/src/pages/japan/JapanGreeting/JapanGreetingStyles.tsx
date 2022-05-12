import styled from "styled-components";

export const JapanGreetingContainer = styled.div`
  padding: 150px;

  .video-container {
    margin: 30px 10px;
    .button-container {
      margin: 10px auto;
      text-align: center;

      button {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 900px) {
    padding: 100px 0 0 0;

    .video-container {
      .button-container {
        button {
          font-size: 14px;
        }
      }
    }
  }
`;
