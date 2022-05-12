import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import S3Upload from "components/S3Upload/S3Upload";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import useInput from "hooks/useInput";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import { subHeadingFontSize } from "utils/FontSize";
import QuillEditor from "components/QuillEditor/QuillEditor";

interface SpeakerFormProps {
  openSpeakerForm: boolean;
  setOpenSpeakerForm: Dispatch<SetStateAction<boolean>>;
  setSpeakerSuccessAlert: Dispatch<SetStateAction<boolean>>;
  refreshFunction: () => void;
  selectedSpeaker: Speaker.speakerType;
  selectedSpeakerDetail: Speaker.speakerDetailType;
  // eslint-disable-next-line react/require-default-props
  edit?: boolean;
}

const SpeakerForm = ({
  openSpeakerForm,
  setOpenSpeakerForm,
  setSpeakerSuccessAlert,
  refreshFunction,
  selectedSpeaker,
  selectedSpeakerDetail,
  edit = false,
}: SpeakerFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [keynoteCheck, setKeynoteCheck] = useState<boolean>(
    edit ? selectedSpeaker.keynote === 1 : false,
  );
  const [hasAbstractCheck, setHasAbstractCheck] = useState<boolean>(
    edit ? selectedSpeaker.has_abstract === 1 : false,
  );

  const name = useInput(edit ? selectedSpeaker.name : "");
  const belong = useInput(edit ? selectedSpeaker.belong : "");
  const description = useInput(edit ? selectedSpeaker.description : "");
  // const abstractBelong = useInput(
  //   edit && selectedSpeakerDetail !== undefined
  //     ? selectedSpeakerDetail.belong
  //     : "",
  // );
  // const abstractDesc = useInput(
  //   edit && selectedSpeakerDetail ? selectedSpeakerDetail.rawDescription : "",
  // );
  const [abstractBelong, setAbstractBelong] = useState<string>(
    edit && selectedSpeakerDetail !== undefined
      ? selectedSpeakerDetail.belong
      : "",
  );
  const [abstractDesc, setAbstractDesc] = useState<string>(
    edit && selectedSpeakerDetail ? selectedSpeakerDetail.description : "",
  );
  const [imagePath, setImagePath] = useState<string>(
    edit && selectedSpeaker ? selectedSpeaker.image_path : "",
  );
  const [previewURL, setPreviewURL] = useState<string>("");

  const authState = useAuthState();
  const pathname = usePageViews();

  useEffect(() => {
    setPreviewURL(selectedSpeaker?.image_path);
  }, [selectedSpeaker]);

  const speakerSubmitHandler = async () => {
    if (imagePath === "") return;
    setLoading(true);

    let speakerResult;
    // 편집 모드일때 즉, 스피커 카드를 클릭한 경우
    if (edit) {
      speakerResult = await axios.put(
        `${process.env.API_URL}/api/admin/speaker`,
        {
          id: selectedSpeaker.id,
          nation: pathname,
          name: name.value,
          belong: belong.value,
          description: description.value,
          imagePath,
          keynote: keynoteCheck,
          abstractBelong,
          abstractDesc,
          hasAbstract: hasAbstractCheck,
        },
      );
    } else {
      // 새롭게 생성하는 경우 즉, ADD SPEAKER 를 클릭한경우
      speakerResult = await axios.post(
        `${process.env.API_URL}/api/admin/speaker`,
        {
          nation: pathname,
          name: name.value,
          belong: belong.value,
          description: description.value,
          imagePath,
          keynote: keynoteCheck,
          abstractBelong,
          abstractDesc,
          hasAbstract: hasAbstractCheck,
        },
      );
    }

    if (speakerResult.data.success) {
      setLoading(false);
      setOpenSpeakerForm(false);
      setSpeakerSuccessAlert(true);
      refreshFunction();
    }
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `${process.env.API_URL}/api/admin/speaker/${selectedSpeaker.id}?nation=${pathname}`,
      );
      setSpeakerSuccessAlert(true);
      setOpenSpeakerForm(false);
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      refreshFunction();
    }
  };

  return (
    <CommonModal
      open={openSpeakerForm}
      setOpen={setOpenSpeakerForm}
      title={edit ? "Modify Speaker" : "Add Speaker"}
      desc={
        edit
          ? "Please write down the name and affiliation of the speaker you want to change."
          : "Please write down the name and affiliation of the speaker."
      }
      onSubmit={speakerSubmitHandler}
      submitDisabled={name.value === "" || imagePath === ""}
      loading={loading || uploadLoading}
    >
      <TextField
        margin="dense"
        label="Name"
        fullWidth
        variant="filled"
        required
        error={name.value === ""}
        sx={{ marginBottom: "15px" }}
        {...name}
      />
      <TextField
        margin="dense"
        label="Belong"
        fullWidth
        variant="filled"
        multiline
        sx={{ marginBottom: "15px" }}
        {...belong}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        variant="filled"
        multiline
        sx={{ marginBottom: "15px" }}
        {...description}
      />
      <Stack direction="row">
        <FormControlLabel
          control={
            <Checkbox
              checked={keynoteCheck}
              onClick={() => setKeynoteCheck(!keynoteCheck)}
            />
          }
          label="Show the speaker on main page"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasAbstractCheck}
              onClick={() => setHasAbstractCheck(!hasAbstractCheck)}
            />
          }
          label="Show Speakers Abstract"
        />
      </Stack>
      {/* abstract form */}
      {hasAbstractCheck && (
        <>
          <Typography fontWeight={600}>Abstract affiliation:</Typography>
          <QuillEditor value={abstractBelong} setValue={setAbstractBelong} />
          <br />
          <Typography fontWeight={600}>Abstract description:</Typography>
          <QuillEditor value={abstractDesc} setValue={setAbstractDesc} />
        </>
      )}
      {/* abstract form end */}
      <S3Upload
        setImagePath={setImagePath}
        edit={edit}
        previewURL={previewURL}
        setPreviewURL={setPreviewURL}
        setUploadLoading={setUploadLoading}
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

export default SpeakerForm;
