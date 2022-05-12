import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  max-width: 1200px;
  padding: 80px 30px;
  margin: 0 auto;

  .email-section {
    width: 40%;
    min-width: 220px;
    margin: 0 auto 20px auto;
  }
  .code-section {
    width: 40%;
    min-width: 220px;
    margin: 0 auto;
  }

  .password-section {
    width: 40%;
    min-width: 220px;
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    .email-section,
    .code-section {
      flex-direction: column;
    }
  }
`;
