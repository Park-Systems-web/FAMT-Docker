/* eslint-disable react/require-default-props */
import { Button, styled } from "@mui/material";
import { myBucket } from "components/S3Upload/S3Upload";
import usePageViews from "hooks/usePageViews";
import React, {
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { useLocation } from "react-router";
import S3Props, { S3_BUCKET } from "utils/S3Props";

interface uploadButtonProps extends ComponentPropsWithoutRef<"div"> {
  setImagePath?: Dispatch<SetStateAction<string>>;
  uploadLoading?: boolean;
  setUploadLoading?: Dispatch<SetStateAction<boolean>>;
  uploadPath?: string;
  submitHandler?: (imagePath: string) => void;
}

const Input = styled("input")({
  display: "none",
});

const UploadButton = ({
  setImagePath,
  uploadLoading,
  setUploadLoading,
  uploadPath,
  submitHandler,
  ...rest
}: uploadButtonProps) => {
  const [progress, setProgress] = useState<number>(0);

  const pathname = usePageViews();
  const location = useLocation();

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/webp"
      )
    ) {
      alert("file type not allowed");
      return;
    }
    setProgress(0);
    setUploadLoading(true);
    uploadFile(file);
  };
  const uploadFile = (file: File) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${uploadPath}/${location.pathname.split("/").slice(-1)[0]}/${`${
        file.name.split(".")[0]
      }_${Date.now()}.${file.name.split(".")[1]}`}`,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt, res) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setTimeout(() => {
          console.log("완료");
          setUploadLoading(false);
        }, 3000);
      })
      .send((err, data) => {
        if (err) console.log(err);
        setImagePath(params.Key);
        submitHandler(params.Key);
      });
  };
  return (
    <label
      htmlFor="contained-button-file"
      style={{
        pointerEvents: uploadLoading ? "none" : "auto",
        opacity: uploadLoading ? "0.3" : "1.0",
      }}
    >
      <Input
        accept="image/jpeg,image/png,image/jpg,image/webp"
        id="contained-button-file"
        type="file"
        onChange={handleFileInput}
      />
      {rest.children}
    </label>
  );
};

export default UploadButton;
