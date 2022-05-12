import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Select, SelectChangeEvent, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";

interface AgendaFormProps {
  openAgendaForm: boolean;
  agendaValidAlert: boolean;
  setOpenAgendaForm: Dispatch<SetStateAction<boolean>>;
  setAgendaSuccess: Dispatch<SetStateAction<boolean>>;
  setAgendaValidAlert: Dispatch<SetStateAction<boolean>>;
  selectedAgenda: Program.programAgendaType;
  sessions: Program.sessionType[];
  programs: Program.programType[];
  getProgramAgenda: () => void;
  edit: boolean;
}

const AgendaForm = ({
  openAgendaForm,
  setOpenAgendaForm,
  setAgendaSuccess,
  selectedAgenda,
  getProgramAgenda,
  sessions,
  programs,
  agendaValidAlert,
  setAgendaValidAlert,
  edit = false,
}: AgendaFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const pathname = usePageViews();

  const [selectedProgram, setSelectedProgram] = useState<number>(
    edit ? selectedAgenda.program_id : programs[0].id,
  );
  const [selectedSession, setSelectedSession] = useState<number>(
    edit ? selectedAgenda.session_id : sessions[0].id,
  );

  const submitHandler = async () => {
    if (title.value === "" || selectedProgram === -1) {
      setAgendaValidAlert(true);
      return;
    }

    let data;
    setLoading(true);

    if (edit) {
      data = await axios.put(
        `${process.env.API_URL}/api/admin/program/agenda`,
        {
          session_id: selectedSession,
          nation: pathname,
          id: selectedAgenda.id,
          program_id: selectedProgram,
          title: title.value,
          speakers: speakers.value,
        },
      );
    } else {
      data = await axios.post(
        `${process.env.API_URL}/api/admin/program/agenda`,
        {
          session_id: selectedSession,
          nation: pathname,
          program_id: selectedProgram,
          title: title.value,
          speakers: speakers.value,
        },
      );
    }

    if (data.data.success) {
      setLoading(false);
      setAgendaSuccess(true);
      setOpenAgendaForm(false);
      getProgramAgenda();
    }
  };

  const title = useInput(edit ? selectedAgenda.title : "");
  const speakers = useInput(edit ? selectedAgenda.speakers : "");

  const changeSessionHandler = (event: SelectChangeEvent<number>) => {
    setSelectedSession(event.target.value as number);
    const filteredPrograms = programs.filter(
      (program) => program.session === event.target.value,
    );
    setSelectedProgram(
      filteredPrograms.length !== 0 ? filteredPrograms[0].id : -1,
    );
  };
  const changeProgramHandler = (event: SelectChangeEvent<number>) => {
    setSelectedProgram(event.target.value as number);
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const result = await axios.delete(
        `${process.env.API_URL}/api/admin/program/agenda/${selectedAgenda.id}?nation=${pathname}`,
      );
      if (result.data.success) {
        setAgendaSuccess(true);
        setOpenAgendaForm(false);
      }
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      getProgramAgenda();
    }
  };

  return (
    <CommonModal
      open={openAgendaForm}
      setOpen={setOpenAgendaForm}
      title={edit ? "Modify Agenda" : "Add Agenda"}
      desc={
        edit
          ? "Please enter the content that you want to change."
          : "Please choose the proper session and program to add the agenda."
      }
      onSubmit={submitHandler}
      loading={loading}
      submitDisabled={title.value === "" || selectedProgram === -1}
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
        >
          {sessions.map((session) => (
            <MenuItem key={session.id} value={session.id}>
              {session.session_title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="demo-simple-select-label">Program</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProgram}
          label="Program"
          onChange={(event: SelectChangeEvent<number>) => {
            changeProgramHandler(event);
          }}
        >
          {console.log(
            programs.filter((program) => program.session === selectedSession)
              .length,
          )}
          {programs.filter((program) => program.session === selectedSession)
            .length === 0 ? (
            <MenuItem key="no-item" value={-1}>
              * Please add a program first
            </MenuItem>
          ) : (
            programs
              .filter((program) => program.session === selectedSession)
              .map((program) => (
                <MenuItem key={program.id} value={program.id}>
                  {program.title}
                </MenuItem>
              ))
          )}
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        label="Agenda Title"
        fullWidth
        required
        error={!title.value}
        variant="filled"
        sx={{ marginBottom: "30px" }}
        {...title}
      />
      <TextField
        margin="dense"
        label="Speakers"
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        {...speakers}
      />
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

export default AgendaForm;
