import { useTheme } from "@mui/material";
import styled from "styled-components";

export const ProgramTitleContainer = styled.div<{ isAdmin: boolean }>`
  margin: 10px 10px 0 10px;
  background: ${() => {
    const theme = useTheme();
    return theme.palette.primary.gradation;
  }};
  padding: 5px 20px;
  .styled-table {
    font-size: 3rem;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    color: #ffffff;
    margin: auto;
    text-align: center;
  }

  .styled-tr {
    padding: 10px 20px;
    margin: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 40px;
  }

  //for admin page UX

  cursor: ${(props) => props.isAdmin && "pointer"};

  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(${(props) => props.isAdmin && "-5px"});
  }
`;
