import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import CommonModal from "components/CommonModal/CommonModal";
import axios from "axios";
import { Checkbox, DialogContentText, FormControlLabel } from "@mui/material";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import { ProgramHideFormContentContainer } from "./ProgramHideFormStyles";

interface ProgramHideFormProps {
  refreshFunction: () => void;
  openHideForm: boolean;
  setOpenHideForm: Dispatch<SetStateAction<boolean>>;
}

const ProgramHideForm = ({
  openHideForm,
  setOpenHideForm,
  refreshFunction,
}: ProgramHideFormProps) => {
  const authState = useAuthState();
  const [programCheckedList, setProgramCheckedList] = useState<
    Program.programType[]
  >([]);
  const [sessionCheckedList, setSessionCheckedList] = useState<
    Program.sessionType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hidePrograms, setHidePrograms] = useState<Program.programType[]>();
  const [hideSessions, setHideSessions] = useState<Program.sessionType[]>();

  const pathname = usePageViews();
  const config = {
    params: {
      nation: pathname,
    },
  };
  useEffect(() => {
    const getHidePrograms = async () => {
      const programs = await axios.get(
        `${process.env.API_URL}/api/admin/hideProgram`,
        config,
      );
      setHidePrograms(programs.data);
    };

    const getHideSessions = async () => {
      const sessions = await axios.get(
        `${process.env.API_URL}/api/admin/hideSession`,
        config,
      );
      setHideSessions(sessions.data);
    };

    getHidePrograms();
    getHideSessions();
  }, []);

  const showSubmitHandler = () => {
    const showProgram = async () => {
      console.log(authState.role, programCheckedList);
      const data = await axios.put(
        `${process.env.API_URL}/api/admin/showProgram`,
        {
          nation: pathname,
          programs: programCheckedList,
        },
      );
    };

    const showSession = async () => {
      const data = await axios.put(
        `${process.env.API_URL}/api/admin/showSession`,
        {
          nation: pathname,
          sessions: sessionCheckedList,
        },
      );
    };

    showProgram();
    showSession();
    refreshFunction();
  };

  // 개별 체크 클릭 시 발생하는 함수
  const programCheckedElement = useCallback(
    (program: Program.programType) => {
      if (!programCheckedList?.includes(program)) {
        setProgramCheckedList([
          ...(programCheckedList as Program.programType[]),
          program,
        ]);
      } else {
        setProgramCheckedList(
          programCheckedList?.filter((el) => el !== program),
        );
      }
    },
    [programCheckedList],
  );

  // 개별 체크 클릭 시 발생하는 함수
  const sessionCheckedElement = useCallback(
    (session: Program.sessionType) => {
      if (!sessionCheckedList?.includes(session)) {
        setSessionCheckedList([
          ...(sessionCheckedList as Program.sessionType[]),
          session,
        ]);
      } else {
        setSessionCheckedList(
          sessionCheckedList?.filter((el) => el !== session),
        );
      }
    },
    [sessionCheckedList],
  );
  return (
    <CommonModal
      open={openHideForm}
      setOpen={setOpenHideForm}
      title="Choose the item you want to show"
      desc=""
      onSubmit={showSubmitHandler}
      loading={loading}
    >
      <DialogContentText>Sessions</DialogContentText>
      <ProgramHideFormContentContainer>
        {hideSessions?.map((session) => (
          <FormControlLabel
            key={session.id}
            control={
              <Checkbox
                onChange={() => {
                  sessionCheckedElement(session);
                }}
                inputProps={{ "aria-label": "controlled" }}
                checked={sessionCheckedList?.includes(session)}
              />
            }
            label={`${session.session_title} / ${session.date.substring(
              0,
              10,
            )}`}
          />
        ))}
        <DialogContentText>Programs</DialogContentText>

        {hidePrograms?.map((program) => (
          <FormControlLabel
            key={program.id}
            control={
              <Checkbox
                onChange={() => {
                  programCheckedElement(program);
                }}
                inputProps={{ "aria-label": "controlled" }}
                checked={programCheckedList?.includes(program)}
              />
            }
            label={`${program.title} / ${program.speakers}`}
          />
        ))}
      </ProgramHideFormContentContainer>
    </CommonModal>
  );
};

export default ProgramHideForm;
