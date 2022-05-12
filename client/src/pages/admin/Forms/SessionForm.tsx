import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  DesktopDatePicker,
  LocalizationProvider,
  LoadingButton,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios, { AxiosResponse } from "axios";
import CommonModal from "components/CommonModal/CommonModal";
import useInput from "hooks/useInput";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getUserTimezoneDate, isDateValid } from "utils/Date";
import usePageViews from "hooks/usePageViews";
import { useAuthState } from "../../../context/AuthContext";

interface SessionFormProps {
  openSessionForm: boolean;
  setOpenSessionForm: Dispatch<SetStateAction<boolean>>;
  setSessionSuccess: Dispatch<SetStateAction<boolean>>;
  selectedSession: Program.sessionType;
  getSessions: () => void;
  getPrograms: () => void;
  selectedTimezone: string;
  edit: boolean;
  sessionValidAlert: boolean;
  setSessionValidAlert: Dispatch<SetStateAction<boolean>>;
}

const SessionForm = ({
  openSessionForm,
  setOpenSessionForm,
  setSessionSuccess,
  selectedSession,
  getSessions,
  getPrograms,
  selectedTimezone,
  sessionValidAlert,
  setSessionValidAlert,
  // 편집모달일때는 edit 이 true 로 넘어온다
  edit = false,
}: SessionFormProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");
  const [date, setDate] = useState<Date | null>(
    edit
      ? getUserTimezoneDate(selectedSession.date, selectedTimezone)
      : new Date(),
  );

  const title = useInput(edit ? selectedSession.session_title : "");

  const sessionSubmitHandler = async () => {
    if (title.value === "" || !isDateValid(date)) {
      setSessionValidAlert(true);
      return;
    }
    setLoading(true);
    let data;

    // 편집 모달이라면 put 호출
    if (edit) {
      data = await axios.put(`${process.env.API_URL}/api/admin/session`, {
        nation: pathname,
        id: selectedSession.id,
        title: title.value,
        status: status === "show" ? 1 : 0,
        date,
      });
    } else {
      // 추가 모달이라면 post 호출
      data = await axios.post(`${process.env.API_URL}/api/admin/session`, {
        nation: pathname,
        title: title.value,
        date,
      });
    }
    if (data.data.success) {
      setLoading(true);
      setSessionSuccess(true);
      setOpenSessionForm(false);
      getSessions();
    }
  };
  const dateChangeHandler = (newValue: Date | null) => {
    setDate(newValue);
  };

  const statusChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: Common.showStatus,
  ) => {
    setStatus(newStatus);
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const data = await axios.delete(
        `${process.env.API_URL}/api/admin/session/${selectedSession.id}?nation=${pathname}`,
      );

      console.log(data.data.success);
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      setSessionSuccess(true);
      setOpenSessionForm(false);
      getSessions();
      getPrograms();
    }
  };

  return (
    <CommonModal
      open={openSessionForm}
      setOpen={setOpenSessionForm}
      title={edit ? "Modify Session" : "Add Session"}
      desc={
        edit
          ? "Please choose the title and date that you want to change."
          : "Please write down the session title and choose a date."
      }
      onSubmit={sessionSubmitHandler}
      loading={loading}
      submitDisabled={title.value === "" || !isDateValid(date)}
    >
      <TextField
        autoFocus
        margin="dense"
        label="Session Title"
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        required
        {...title}
        error={title.value === ""}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Session Date"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={dateChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      {/* 편집 모달일때만 show hide 보여주기 */}
      {/* {edit && (
        <ToggleButtonGroup
          size="large"
          color="primary"
          value={status}
          exclusive
          onChange={statusChangeHandler}
          sx={{ ml: 5 }}
        >
          <ToggleButton value="show">show</ToggleButton>
          <ToggleButton value="hide">hide</ToggleButton>
        </ToggleButtonGroup>
      )} */}
      {edit && (
        <LoadingButton
          loading={deleteLoading}
          variant="contained"
          color="error"
          onClick={deleteHandler}
          style={{
            position: "absolute",
            right: "22px",
            top: "12px",
          }}
        >
          Delete
        </LoadingButton>
      )}
    </CommonModal>
  );
};

export default SessionForm;
