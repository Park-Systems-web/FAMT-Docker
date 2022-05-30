/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import { dateToLocaleString } from "utils/Date";
import {
  styled,
  TableRow,
  TableCell,
  useTheme,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ArrowCircleUp,
  ArrowCircleDown,
  NoEncryption,
} from "@mui/icons-material";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { mainFontSize } from "utils/FontSize";

interface ProgramContentProps extends Program.programType {
  id: number;
  index: number;
  isAdmin: boolean;
  onClick?: () => void;
  selectedTimezone: string;
  selectedAgenda?: Program.programAgendaType;
  setSelectedAgenda?: React.Dispatch<Program.programAgendaType>;
  setOpenAgendaForm?: React.Dispatch<boolean>;
  setAgendaEdit?: React.Dispatch<boolean>;
}

interface programAgendaEditType extends Program.programAgendaType {
  edit: boolean;
}

const ProgramContent = ({
  id,
  start_time,
  end_time,
  title,
  speakers,
  emphasize,
  description,
  index,
  isAdmin,
  onClick,
  selectedTimezone,
  selectedAgenda,
  setSelectedAgenda,
  setOpenAgendaForm,
  setAgendaEdit,
}: ProgramContentProps) => {
  const theme = useTheme();
  const nation = usePageViews();

  // 아젠다 edit 여부 포함된 리스트

  const [agendaEditList, setAgendaEditList] = useState<programAgendaEditType[]>(
    [],
  );

  // reordering loading
  const [reorderLoading, setReorderLoading] = useState<boolean>(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.black,
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: isAdmin ? "pointer" : "default",
    td: {
      // lineHeight: "2.2",
      padding: "6px 20px",
    },
    transition: "all 0.2s ease-in-out",
    opacity: "1.0",
    ".speaker-text": {
      color: theme.palette.primary.main,
    },
    ".title-col": {
      // whiteSpace: "nowrap",
      "&.emphasize .title": {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    "&.program-row:nth-of-type(odd)": {
      ".time-col": {
        backgroundColor: "#dbdbdb",
      },

      ".title-col": {
        backgroundColor: "#f6f6f6",
      },
    },
    "&.program-row:nth-of-type(even)": {
      ".time-col": {
        backgroundColor: "#cacaca",
      },

      ".title-col": {
        backgroundColor: "#ececec",
      },
    },

    // admin
    "&.admin": {
      transition: "all 0.2s ease-in-out",
    },
    ".agenda-move-section": {
      padding: "6px 20px",
      display: "flex",
      position: "absolute",
      transform: "translate(-80%,-50%)",
      color: "white",
    },
    // "&.admin.program-wrap:hover": {
    //   transform: "translateY(-5px)",
    // },

    "&.disabled": {
      pointerEvents: "none",
      opacity: "0.3",
    },
  }));

  const reorderAgendaHandler = (agendaList: programAgendaEditType[]) => {
    setReorderLoading(true);
    axios
      .post(`${process.env.API_URL}/api/admin/program/agenda/reorder`, {
        agendaList,
        nation,
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setReorderLoading(false);
      });
  };

  const agendaEditHandler = (agenda: Program.programAgendaType) => {
    if (setSelectedAgenda && setOpenAgendaForm && setAgendaEdit) {
      setSelectedAgenda(agenda);
      setOpenAgendaForm(true);
      setAgendaEdit(true);
    }
  };

  const clickUpHandler = (
    agenda: Program.programAgendaType,
    indexInParent: number,
  ) => {
    const index = agendaEditList.findIndex((o) => o.id === agenda.id);
    const listCpy = [...agendaEditList];

    // 0
    const id0 = listCpy[index].id;
    const next0 = listCpy[index].next_id;
    // -1
    const idm1 = listCpy[index - 1].id;
    const nextm1 = listCpy[index - 1].next_id;
    // -2

    if (indexInParent - 2 >= 0 && listCpy[index - 2].next_id !== 99999) {
      const idm2 = listCpy[index - 2].id;
      const nextm2 = listCpy[index - 2].next_id;
    }

    // swap
    const tmp = listCpy[index - 1];
    listCpy[index - 1] = listCpy[index];
    listCpy[index] = tmp;

    // next id 재배정
    if (indexInParent - 2 >= 0 && listCpy[index - 2].next_id !== 99999) {
      listCpy[index - 2].next_id = id0;
    }
    listCpy[index - 1].next_id = idm1;
    listCpy[index].next_id = next0;

    setAgendaEditList(listCpy);
    const updatedList = [listCpy[index - 1], listCpy[index]];
    if (indexInParent - 2 >= 0 && listCpy[index - 2].next_id !== 99999) {
      updatedList.unshift(listCpy[index - 2]);
    }
    reorderAgendaHandler(updatedList);
  };

  const clickDownHandler = (
    agenda: Program.programAgendaType,
    indexInParent: number,
  ) => {
    const index = agendaEditList.findIndex((o) => o.id === agenda.id);
    const listCpy = [...agendaEditList];

    // 0
    const id0 = listCpy[index].id;
    const next0 = listCpy[index].next_id;
    // +1
    const idp1 = listCpy[index + 1].id;
    const nextp1 = listCpy[index + 1].next_id;
    // m1

    if (indexInParent > 0) {
      const idm1 = listCpy[index - 1].id;
      const nextm1 = listCpy[index - 1].next_id;
    }

    // swap
    const tmp = listCpy[index + 1];
    listCpy[index + 1] = listCpy[index];
    listCpy[index] = tmp;

    // next id 재배정

    if (indexInParent > 0) {
      listCpy[index - 1].next_id = idp1;
    }
    listCpy[index].next_id = id0;
    listCpy[index + 1].next_id = nextp1;

    setAgendaEditList(listCpy);
    const updatedList = [listCpy[index], listCpy[index + 1]];
    if (indexInParent > 0) {
      updatedList.unshift(listCpy[index - 1]);
    }
    reorderAgendaHandler(updatedList);
  };

  return (
    <>
      <StyledTableRow
        className={`program-row${isAdmin ? " admin" : ""}${
          reorderLoading ? " disabled" : ""
        }`}
        onClick={onClick}
      >
        <StyledTableCell className="time-col" align="center" width="134px">
          <Typography
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
          >
            {dateToLocaleString(start_time, selectedTimezone, "HH:mm")} -{" "}
            {dateToLocaleString(end_time, selectedTimezone, "HH:mm")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell
          className={`title-col${emphasize ? " emphasize" : ""}`}
          align="left"
        >
          {speakers && (
            <Typography
              component="span"
              className="speaker-text title"
              fontSize={mainFontSize}
              fontWeight={theme.typography.fontWeightMedium}
            >
              {speakers}
            </Typography>
          )}
          {speakers && title && (
            <Typography
              component="span"
              className="title"
              fontSize={mainFontSize}
              fontWeight={theme.typography.fontWeightMedium}
            >
              {" "}
              |{" "}
            </Typography>
          )}
          <Typography
            component="span"
            className="title"
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
          >
            {title}
          </Typography>
          <br />
          <Typography
            component="span"
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
            color={theme.palette.grey[600]}
          >
            {description}
          </Typography>
        </StyledTableCell>
      </StyledTableRow>
      {agendaEditList
        .filter((agenda) => agenda.program_id === id)
        .map((agenda, index) => (
          <React.Fragment key={agenda.id}>
            <StyledTableRow
              className={`agenda-row${isAdmin ? " admin" : ""}${
                reorderLoading ? " disabled" : ""
              }`}
            >
              {isAdmin && (
                <StyledTableCell
                  width="0%"
                  style={{ padding: 0, border: "none" }}
                >
                  <Box
                    className={`agenda-move-section ${
                      agendaEditList[index].edit ? " active" : "active"
                    }`}
                  >
                    <IconButton
                      sx={{ p: "3px" }}
                      disabled={index === 0}
                      onClick={() => {
                        clickUpHandler(agenda, index);
                      }}
                    >
                      <ArrowCircleUp />
                    </IconButton>
                    <IconButton
                      sx={{ p: "3px" }}
                      disabled={agenda.next_id === 99999}
                      onClick={() => {
                        clickDownHandler(agenda, index);
                      }}
                    >
                      <ArrowCircleDown />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              )}

              <StyledTableCell
                align="center"
                width="15%"
                onClick={() => {
                  agendaEditHandler(agenda);
                }}
              />
              <StyledTableCell
                align="left"
                width="50%"
                onClick={() => {
                  agendaEditHandler(agenda);
                }}
              >
                <li style={{ listStyle: "square" }}>{agenda.title}</li>
              </StyledTableCell>
            </StyledTableRow>
          </React.Fragment>
        ))}
    </>
  );
};

export default ProgramContent;
