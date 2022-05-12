import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Checkbox,
  Select,
  SelectChangeEvent,
  TextField,
  FormControlLabel,
} from "@mui/material";
import CommonModal from "components/CommonModal/CommonModal";

import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker, LocalizationProvider, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";
import { getUserTimezoneDate, isDateValid } from "utils/Date";

interface ProgramFormProps {
  openProgramForm: boolean;
  programValidAlert: boolean;
  setOpenProgramForm: Dispatch<SetStateAction<boolean>>;
  setProgramSuccess: Dispatch<SetStateAction<boolean>>;
  setProgramValidAlert: Dispatch<SetStateAction<boolean>>;
  selectedProgram: Program.programType;
  sessions: Program.sessionType[];
  getPrograms: () => void;
  selectedTimezone: string;
  edit: boolean;
}
const ProgramForm = ({
  openProgramForm,
  setOpenProgramForm,
  selectedProgram,
  setProgramSuccess,
  programValidAlert,
  setProgramValidAlert,
  sessions,
  getPrograms,
  selectedTimezone,
  edit = false,
}: ProgramFormProps) => {
  const [startTime, setStartTime] = useState<Date | null>(
    edit
      ? getUserTimezoneDate(selectedProgram.start_time, selectedTimezone)
      : getUserTimezoneDate(sessions[0].date, selectedTimezone),
  );
  const [endTime, setEndTime] = useState<Date | null>(
    edit
      ? getUserTimezoneDate(selectedProgram.end_time, selectedTimezone)
      : getUserTimezoneDate(sessions[0].date, selectedTimezone),
  );
  const [emphasizeCheck, setEmphasizeCheck] = useState<boolean>(
    edit ? selectedProgram.emphasize === 1 : false,
  );
  const [speakerCheck, setSpeakerCheck] = useState<boolean>(
    edit ? selectedProgram.speakers !== "" : false,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const pathname = usePageViews();

  const programSubmitHandler = async () => {
    if (
      // title.value === "" ||
      !isDateValid(startTime) ||
      !isDateValid(endTime)
    ) {
      setProgramValidAlert(true);
      return;
    }
    setLoading(true);
    let data;

    if (edit) {
      data = await axios.put(`${process.env.API_URL}/api/admin/program`, {
        nation: pathname,
        id: selectedProgram.id,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        startTime: startTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        endTime: endTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        session: selectedSession,
        emphasize: emphasizeCheck,
      });
    } else {
      data = await axios.post(`${process.env.API_URL}/api/admin/program`, {
        nation: pathname,
        session: selectedSession,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        startTime: startTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        endTime: endTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        emphasize: emphasizeCheck ? 1 : 0,
      });
    }

    if (data.data.success) {
      setLoading(false);
      setProgramSuccess(true);
      setOpenProgramForm(false);
      getPrograms();
    }
  };

  // selectedProgram.session 은 id 이고 selectedSession 은 string 이 들어가야한다
  const [selectedSession, setSelectedSession] = useState<number>(
    edit ? selectedProgram.session : sessions[0].id,
  );

  const title = useInput(edit ? selectedProgram.title : "");
  const speakers = useInput(edit ? selectedProgram.speakers : "");
  const description = useInput(edit ? selectedProgram.description : "");

  const changeSessionHandler = (event: SelectChangeEvent<number>) => {
    setSelectedSession(event.target.value as number);

    const selectedSessionArr = sessions.filter((session) => {
      return session.id === event.target.value;
    });
    const selectedDate = new Date(selectedSessionArr[0].date);
    const newYear = selectedDate.getFullYear();
    const newMonth = selectedDate.getMonth();
    const newDate = selectedDate.getDate();

    // 선택한 세션에 맞게 시간 변경.
    const newStart = startTime;
    newStart?.setFullYear(newYear);
    newStart?.setMonth(newMonth);
    newStart?.setDate(newDate);
    const newEnd = endTime;
    newEnd?.setFullYear(newYear);
    newEnd?.setMonth(newMonth);
    newEnd?.setDate(newDate);

    setStartTime(newStart);
    setEndTime(newEnd);
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const result = await axios.delete(
        `${process.env.API_URL}/api/admin/program/${selectedProgram.id}?nation=${pathname}`,
      );
      if (result.data.success) {
        setProgramSuccess(true);
        setOpenProgramForm(false);
      }
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      getPrograms();
    }
  };

  useEffect(() => {
    if (!speakerCheck) {
      speakers.value = "";
    }
  }, [speakerCheck]);

  return (
    <CommonModal
      open={openProgramForm}
      setOpen={setOpenProgramForm}
      title={edit ? "Modify Program" : "Add Program"}
      desc={
        edit
          ? "Please choose the title and date that you want to change."
          : "Please choose the proper item to add the program."
      }
      onSubmit={programSubmitHandler}
      loading={loading}
      submitDisabled={
        // title.value === "" ||
        !isDateValid(startTime) || !isDateValid(endTime)
      }
    >
      <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
        <InputLabel id="demo-simple-select-label">Session</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSession}
          label="Session"
          onChange={(event: SelectChangeEvent<number>) => {
            changeSessionHandler(event);
          }}
          required
        >
          {sessions.map((session) => (
            <MenuItem key={session.id} value={session.id}>
              {session.session_title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={emphasizeCheck}
            onClick={() => setEmphasizeCheck(!emphasizeCheck)}
          />
        }
        label="Emphasize?"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={speakerCheck}
            onClick={() => setSpeakerCheck(!speakerCheck)}
          />
        }
        label="Has Speaker?"
      />
      <TextField
        margin="dense"
        label="Speaker"
        fullWidth
        variant="filled"
        disabled={!speakerCheck}
        sx={{ marginBottom: "30px" }}
        {...speakers}
        value={!speakerCheck ? "" : speakers.value}
      />
      <TextField
        margin="dense"
        label={speakerCheck ? "Affiliation" : "Title"}
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        // error={title.value === ""}
        {...title}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        variant="filled"
        multiline
        sx={{ marginBottom: "30px" }}
        {...description}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Start Time"
          value={startTime}
          inputFormat="yyyy/MM/dd hh:mm a"
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
        />
        {"  "}
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="End Time"
          inputFormat="yyyy/MM/dd hh:mm a"
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
        />
      </LocalizationProvider>
      <h3 style={{ marginTop: "5px" }}>
        {" "}
        Please enter the above time based on your location. ✔ {selectedTimezone}
      </h3>
      {/* {edit && (
        <ToggleButtonGroup
          size="large"
          color="primary"
          value={status}
          exclusive
          onChange={statusChangeHandler}
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

export default ProgramForm;
