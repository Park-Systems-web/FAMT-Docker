import styled from "styled-components";

export const KoreaAttendContainer = styled.div`
  margin: 0 auto;
  padding: 150px;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  .image-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      margin: 20px auto;
      border-radius: 10px;
      box-shadow: 0px 4px 2px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 2px 5px 0px rgb(0 0 0 / 12%);
    }
  }

  .map-container {
    .string-container {
      display: flex;
      align-items: center;
      i {
        color: #0090ff;
        margin-right: 10px;
      }
      p {
        margin: 0px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  @media screen and (max-width: 1500px) {
    li {
      margin: 0 20px;
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 30px;
    padding-top: 150px;
    .sequence {
      flex-direction: column;

      li {
        margin: 10px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .button-container {
      button {
        font-size: 15px;
      }
    }
  }
`;
