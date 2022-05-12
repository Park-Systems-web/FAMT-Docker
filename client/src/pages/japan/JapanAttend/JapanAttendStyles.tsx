import styled from "styled-components";

export const JapanAttendContainer = styled.div`
  margin: 0 auto;
  padding: 150px;
  background-color: #fff;
  //다운로드버튼
  display: flex;
  flex-direction: column;

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    button {
      font-size: 20px;
    }
  }

  img {
    margin: 0 auto;
  }

  .sequence {
    list-style: none;
    display: flex;
    justify-content: space-evenly;

    li {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    h5 {
      font-size: 20px;
      font-weight: 800;
    }
    span {
      font-weight: 600;
      font-size: 17px;
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

export const JapanAttendMapContainer = styled.section`
  display: flex;
  align-items: center;
  img {
    width: 50%;
  }
  p {
    margin-left: 10px;
    width: 50%;
    font-size: 16px;
    font-weight: bold;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    img {
      width: 80%;
    }
    p {
      margin-top: 10px;
    }
  }
`;
