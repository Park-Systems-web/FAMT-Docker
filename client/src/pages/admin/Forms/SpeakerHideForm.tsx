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

interface SpeakerHideFormProps {
  refreshFunction: () => void;
  openHideForm: boolean;
  setOpenHideForm: Dispatch<SetStateAction<boolean>>;
}

const SpeakerHideForm = ({
  openHideForm,
  setOpenHideForm,
  refreshFunction,
}: SpeakerHideFormProps) => {
  const authState = useAuthState();
  const [speakerCheckedList, setSpeakerCheckedList] = useState<
    Speaker.speakerType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hideSpeakers, setHideSpeakers] = useState<Speaker.speakerType[]>();
  const pathname = usePageViews();
  const config = {
    params: {
      nation: pathname,
    },
  };
  useEffect(() => {
    const getHideSpeakers = async () => {
      const speakers = await axios.get(
        `${process.env.API_URL}/api/admin/hideSpeaker`,
        config,
      );
      setHideSpeakers(speakers.data);
    };

    getHideSpeakers();
  }, []);

  const showSubmitHandler = () => {
    const showSpeaker = async () => {
      const data = await axios.put(
        `${process.env.API_URL}/api/admin/showSpeaker`,
        {
          nation: pathname,
          speakers: speakerCheckedList,
        },
      );
    };
    showSpeaker();
    refreshFunction();
    setOpenHideForm(false);
  };

  // 개별 체크 클릭 시 발생하는 함수
  const speakerCheckedElement = useCallback(
    (speaker: Speaker.speakerType) => {
      if (!speakerCheckedList?.includes(speaker)) {
        setSpeakerCheckedList([
          ...(speakerCheckedList as Speaker.speakerType[]),
          speaker,
        ]);
      } else {
        setSpeakerCheckedList(
          speakerCheckedList?.filter((el) => el !== speaker),
        );
      }
    },
    [speakerCheckedList],
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
      <DialogContentText>Speakers</DialogContentText>
      <ProgramHideFormContentContainer>
        {hideSpeakers?.map((speaker) => (
          <FormControlLabel
            key={speaker.id}
            control={
              <Checkbox
                onChange={() => {
                  speakerCheckedElement(speaker);
                }}
                inputProps={{ "aria-label": "controlled" }}
                checked={speakerCheckedList?.includes(speaker)}
              />
            }
            label={`${speaker.name} / ${speaker.belong}`}
          />
        ))}
      </ProgramHideFormContentContainer>
    </CommonModal>
  );
};

export default SpeakerHideForm;
