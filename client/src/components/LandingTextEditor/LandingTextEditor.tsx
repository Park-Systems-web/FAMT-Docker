/* eslint-disable react/require-default-props */
import {
  Box,
  Button,
  IconButton,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import QuillEditor from "components/QuillEditor/QuillEditor";
import { editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import InnerHTML from "dangerously-set-html-content";

interface landingTextEditor extends ComponentPropsWithoutRef<"div"> {
  initialValue?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  preview?: boolean;
  setPreview?: React.Dispatch<React.SetStateAction<boolean>>;
  previewContent?: string;
  setPreviewContent?: React.Dispatch<React.SetStateAction<string>>;
  sx?: SxProps<Theme>;
  applyHandler?: () => void;
}

const LandingTextEditor = ({
  initialValue,
  value,
  setValue,
  edit,
  setEdit,
  preview,
  setPreview,
  previewContent,
  setPreviewContent,
  sx = {},
  applyHandler,
  ...rest
}: landingTextEditor) => {
  const authState = useAuthState();
  const isEditor = editorRole.includes(authState.role);
  const previewHandler = () => {
    setPreview(true);
    setPreviewContent(value);
    setEdit(false);
  };
  const theme = useTheme();

  const resetHandler = () => {
    setValue(initialValue);
  };

  return (
    <Box className="editor-content">
      {isEditor && (
        <IconButton
          component="span"
          className="edit-btn"
          size="small"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <EditIcon />
        </IconButton>
      )}
      {isEditor && edit ? (
        <>
          <QuillEditor value={value} setValue={setValue} />
          <Box sx={{ textAlign: "right" }}>
            <Button onClick={resetHandler}>Reset</Button>
            <Button onClick={previewHandler}>Preview</Button>
            <Button onClick={applyHandler}>Apply</Button>
          </Box>
        </>
      ) : (
        <Box sx={sx}>
          {preview ? (
            <>
              <InnerHTML html={previewContent} />
              <Box sx={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    setPreview(false);
                    setEdit(true);
                  }}
                >
                  End Preview
                </Button>
              </Box>
            </>
          ) : (
            <InnerHTML html={rest.children.toString()} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default LandingTextEditor;
