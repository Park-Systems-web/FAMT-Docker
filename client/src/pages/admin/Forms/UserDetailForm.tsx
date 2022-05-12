import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import { Rating, Select, MenuItem, Typography } from "@mui/material";
import useSelect from "hooks/useSelect";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { useAuthState } from "context/AuthContext";
import { adminRole, editorOnly } from "utils/Roles";

interface UserDetailFormProps {
  openUserDetailForm: boolean;
  setOpenUserDetailForm: Dispatch<SetStateAction<boolean>>;
  selectedUser: User.userType;
  getUsers: () => void;
}

const UserDetailFormContainer = styled.div`
  li {
    margin: 5px 0;
    list-style: none;
    display: flex;
    align-items: center;

    h3 {
      display: inline;
      margin-bottom: 0px;
    }

    & > span {
      margin-left: 10px;
    }
  }
`;

const UserDetailForm = ({
  openUserDetailForm,
  setOpenUserDetailForm,
  selectedUser,
  getUsers,
}: UserDetailFormProps) => {
  const role = useSelect(selectedUser.role);
  const pathname = usePageViews();
  const authState = useAuthState();
  const isAdmin = adminRole.includes(authState.role);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccessAlert, setSubmitSuccessAlert] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await axios.post(`${process.env.API_URL}/api/admin/users/role`, {
        nation: pathname,
        id: selectedUser.id,
        role: role.value,
      });
      getUsers();
      setSubmitSuccessAlert(true);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  console.log(selectedUser);

  return (
    <CommonModal
      open={openUserDetailForm}
      setOpen={setOpenUserDetailForm}
      title="User Detail"
      loading={submitLoading}
      onSubmit={handleSubmit}
      hideSaveButton={!isAdmin}
    >
      <UserDetailFormContainer>
        <ul>
          {Object.entries(selectedUser).map((field) => {
            if (
              field[0] !== "password" &&
              field[0] !== "refresh_token" &&
              field[0] !== "role"
            ) {
              return (
                <li>
                  <Typography fontWeight={700}>{field[0]}: </Typography>
                  <span>{field[1]}</span>
                </li>
              );
            }
            if (field[0] === "role") {
              return (
                <li>
                  <Typography fontWeight={700}>{field[0]}: </Typography>
                  {editorOnly.includes(authState.role) && (
                    <span>{selectedUser.role}</span>
                  )}
                  {isAdmin && (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      defaultValue={selectedUser.role}
                      sx={{ ml: 1 }}
                      {...role}
                    >
                      <MenuItem value="subscriber">Subscriber</MenuItem>
                      <MenuItem value="editor">Editor</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  )}
                </li>
              );
            }

            return false;
          })}
        </ul>
      </UserDetailFormContainer>
      <TopCenterSnackBar
        value={submitSuccessAlert}
        setValue={setSubmitSuccessAlert}
        variant="filled"
        severity="success"
        content="User's role changed"
      />
    </CommonModal>
  );
};

export default UserDetailForm;
