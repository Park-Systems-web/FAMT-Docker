import styled from "styled-components";

export const CloseButtonContainer = styled.button`
  color: #888;
  transition: color 0.2s ease-in-out;
  position: absolute;
  right: 0;
  cursor: pointer;
  &:hover {
    color: #000;
  }
  margin: 5px;
`;
