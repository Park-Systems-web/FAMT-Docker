/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import { TextField } from "@mui/material";
import useInput from "hooks/useInput";
import S3Upload from "components/S3Upload/S3Upload";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useNavigate } from "react-router";

interface SponsorFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // setSpeakerSuccessAlert: Dispatch<SetStateAction<boolean>>;
  // refreshFunction: () => void;
  edit?: boolean;
  selectedSponsor?: Common.sponsorType;
}

const SponsorForm = ({
  open,
  setOpen,
  edit,
  selectedSponsor,
}: SponsorFormProps) => {
  const pathname = usePageViews();
  const navigate = useNavigate();
  const sponsorName = useInput(selectedSponsor ? selectedSponsor.name : "");
  const sponsorURL = useInput(selectedSponsor ? selectedSponsor.url : "");
  const [sponsorImagePath, setSponsorImagePath] = useState<string>(
    selectedSponsor ? selectedSponsor.image_path : "",
  );
  const [previewImagePath, setPreviewImagePath] = useState<string>(
    selectedSponsor ? selectedSponsor.image_path : "",
  );

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const sponsorSubmitHandler = async () => {
    setUploadLoading(true);
    try {
      if (edit) {
        await axios.put(`${process.env.API_URL}/api/page/common/sponsor`, {
          nation: pathname,
          id: selectedSponsor.id,
          name: sponsorName.value,
          url: sponsorURL.value,
          imagePath: sponsorImagePath,
        });
      } else {
        await axios.post(`${process.env.API_URL}/api/page/common/sponsor`, {
          nation: pathname,
          name: sponsorName.value,
          url: sponsorURL.value,
          imagePath: sponsorImagePath,
        });
      }
      setOpen(false);
      navigate(0);
    } catch (err) {
      alert(err);
    }
    setUploadLoading(false);
  };

  const deleteHandler = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${process.env.API_URL}/api/page/common/sponsor`, {
        params: {
          nation: pathname,
          id: selectedSponsor.id,
        },
      });
      setOpen(false);
      navigate(0);
    } catch (err) {
      alert(err);
    }
    setDeleteLoading(false);
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      submitText="Apply"
      onSubmit={sponsorSubmitHandler}
      submitDisabled={sponsorImagePath === ""}
      loading={deleteLoading || uploadLoading}
      title={edit ? `Edit a supporter` : "Add a supporter"}
    >
      <TextField
        label="Name"
        fullWidth
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        {...sponsorName}
      />
      <TextField
        label="URL"
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        fullWidth
        {...sponsorURL}
      />
      <S3Upload
        setImagePath={setSponsorImagePath}
        edit={edit}
        previewURL={previewImagePath}
        setPreviewURL={setPreviewImagePath}
        setUploadLoading={setUploadLoading}
        uploadPath="sponsor"
      />
      {edit && (
        <LoadingButton
          loading={deleteLoading || uploadLoading}
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

export default SponsorForm;
