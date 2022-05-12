import styled from "styled-components";
import TimezoneSelect from "react-timezone-select";

export const ProgramsListContainer = styled.div<{ isAdmin?: boolean }>`
  /* https://d25unujvh7ui3r.cloudfront.net/css/program.css */

  // agenda hover
  .agenda-move-section {
    padding: 6px 13px;
    display: none;
    position: absolute;
    transform: translate(-96%, -107%);
    color: white;
    &.active,
    &:hover {
      display: flex;
    }
  }

  @media screen and (max-width: 1024px) {
    .program-table-container {
      overflow-x: auto;
    }
  }
  @media screen and (max-width: 1280px) {
    .program-wrap {
      padding: 10px;
      padding-top: ${(props) => (props.isAdmin ? "0px" : "160px")};
    }
  }
`;

export const StyledTimezoneSelect = styled(TimezoneSelect)`
  width: 300px;
  height: 50px;
  margin-left: auto;
  margin-right: 10px;
  color: black;

  #react-select-3-listbox {
    z-index: 3;
  }
`;

export const SessionContainer = styled.div``;
