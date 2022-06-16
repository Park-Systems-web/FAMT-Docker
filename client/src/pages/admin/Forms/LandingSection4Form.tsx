/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import { Button, Input, Stack, TextField, Typography } from "@mui/material";
import useInput from "hooks/useInput";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useNavigate } from "react-router";
import useAdminStore from "store/AdminStore";
import QuillEditor from "components/QuillEditor/QuillEditor";
import { subHeadingFontSize } from "utils/FontSize";

interface LandingSection4FormProps
  extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // setSpeakerSuccessAlert: Dispatch<SetStateAction<boolean>>;
  // refreshFunction: () => void;
  edit?: boolean;
  selectedSection?: Common.landingSection4Type;
}

const LandingSection4Form = ({
  open,
  setOpen,
  edit,
  selectedSection,
  ...rest
}: LandingSection4FormProps) => {
  const pathname = usePageViews();
  const navigate = useNavigate();

  const title = useInput(edit ? selectedSection.title : "");
  const [description, setDescription] = useState<string>(
    edit ? selectedSection.description : "",
  );

  // loading
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      if (edit) {
        await axios.put(`${process.env.API_URL}/api/page/common/landing/4`, {
          nation: pathname,
          id: selectedSection.id,
          title: title.value,
          description,
        });
      } else {
        await axios.post(`${process.env.API_URL}/api/page/common/landing/4`, {
          nation: pathname,
          title: title.value,
          description,
        });
      }
      navigate(0);
    } catch (error) {
      alert(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `${process.env.API_URL}/api/page/common/landing/4?nation=${pathname}&id=${selectedSection.id}`,
      );
      navigate(0);
    } catch (error) {
      alert(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      title={edit ? "Edit a Session" : "Add a Session"}
      onSubmit={handleSubmit}
      loading={submitLoading || deleteLoading}
    >
      <TextField variant="filled" label="title" sx={{ mb: 2 }} {...title} />
      <Typography fontSize={subHeadingFontSize} fontWeight={600}>
        Description
      </Typography>
      <QuillEditor value={description} setValue={setDescription} />
      <LoadingButton
        loading={deleteLoading}
        variant="contained"
        color="error"
        onClick={handleDelete}
        style={{
          position: "absolute",
          right: "22px",
          top: "12px",
        }}
      >
        Delete
      </LoadingButton>
    </CommonModal>
  );
};

export default LandingSection4Form;
