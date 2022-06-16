import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "components/Title/Title";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import NSSButton from "components/Button/NSSButton";
import useInput from "hooks/useInput";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import { useNavigate } from "react-router";
import { globalData } from "utils/GlobalData";
import LandingSection from "components/Section/LandingSection";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Loading from "components/Loading/Loading";

import { smallFontSize } from "utils/FontSize";
import {
  ResetPasswordContainer,
  OuterResetContainer,
} from "./ResetPasswordStyles";

const inputBoxStyle = {
  backgroundColor: "#fff",
  boxShadow: "0px 0px 16px #0000001f",
  padding: "10px 30px",
};

const ResetPassword = () => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const navigate = useNavigate();

  const {
    resetPasswordHeading,
    setPasswordHeading,
    resetPasswordCurrentLabel,
    resetPasswordNewLabel,
    resetPasswordNewConfirmLabel,
    submitBtnText,
    registerBtnText,
    logoURL,
    registrationStep1Label,
    registrationStep2Label,
    registrationStep3Label,
  } = globalData.get(pathname) as Common.globalDataType;
  const curPassword = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");

  // state
  const [changePasswordloading, setChangePasswordLoading] =
    useState<boolean>(false);
  const [getUserDataloading, setGetUserDataLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);
  // 유저 패스워드 설정 여부
  const [isUserPasswordSet, setIsUserPasswordSet] = useState<boolean>(false);

  // alert 관련 state
  const [passwordSetSuccessAlert, setPasswordSetSuccessAlert] =
    useState<boolean>(false);
  const [tokenNotMatchAlert, setTokenNotMatchAlert] = useState<boolean>(false);
  const [currentPasswordNotMatchAlert, setCurrentPasswordNotMatchAlert] =
    useState<boolean>(false);
  const [emptyAlert, setEmptyAlert] = useState<boolean>(false);
  const [passwordNotMatchAlert, setPasswordNotMatchAlert] =
    useState<boolean>(false);

  const passwordSetHandler = () => {
    if (passwordNotMatch) {
      setPasswordNotMatchAlert(true);
      return;
    }
    if (
      (isUserPasswordSet && curPassword.value === "") ||
      password1.value === "" ||
      password2.value === ""
    ) {
      setEmptyAlert(true);
      return;
    }

    setChangePasswordLoading(true);
    axios
      .post(
        `${process.env.API_URL}/api/users/passwordreset`,
        {
          accessToken: authState.accessToken,
          curPassword: isUserPasswordSet ? curPassword.value : null,
          newPassword: password1.value,
          nation: pathname,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.success) {
          setPasswordSetSuccessAlert(true);
          setTimeout(() => {
            navigate(`/`);
          }, 1500);
        } else {
          switch (res.data.code) {
            case "T40":
            case "T41":
              setTokenNotMatchAlert(true);
              setTimeout(() => {
                navigate(0);
              }, 1500);
              break;
            // case "P40":
            default:
              setCurrentPasswordNotMatchAlert(true);
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setChangePasswordLoading(false);
      });
  };

  const handlePasswordConfirm = () => {
    if (password1.value !== password2.value) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
    }
  };

  useEffect(() => {
    handlePasswordConfirm();
  }, [password1, password2]);

  useEffect(() => {
    setGetUserDataLoading(true);
    axios
      .post(`${process.env.API_URL}/api/users/passwordset/check`, {
        nation: pathname,
        email: authState.email,
      })
      .then((res) => {
        setIsUserPasswordSet(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetUserDataLoading(false);
      });
  }, []);

  return (
    <OuterResetContainer>
      {getUserDataloading && <Loading />}
      {/* {!isUserPasswordSet && !getUserDataloading && (
        <LandingSection className="banner" maxWidth="1920px" fullWidth>
          <Stack justifyContent="center" alignItems="center" height="100%">
            <img className="banner-img" src={logoURL} alt="NSS Logo" />
          </Stack>
        </LandingSection>
      )} */}
      {!getUserDataloading && (
        <ResetPasswordContainer className="layout body-fit">
          {!isUserPasswordSet && (
            <Stack
              className="step-container"
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <div>
                <CheckBoxIcon className="step-icon active" />
                <Typography
                  className="step-caption active"
                  fontSize={smallFontSize}
                  sx={{ position: "absolute" }}
                >
                  {registrationStep1Label || "Your Information"}
                </Typography>
              </div>
              <div className="icon-divider active" />
              <div>
                <LooksTwoIcon className="step-icon active" />
                <Typography
                  className="step-caption caption2 active"
                  fontSize={smallFontSize}
                  sx={{ position: "absolute" }}
                >
                  {registrationStep2Label || "Setting a password"}
                </Typography>
              </div>
              <div className="icon-divider" />
              <div>
                <Looks3Icon className="step-icon" />
                <Typography
                  className="step-caption"
                  fontSize={smallFontSize}
                  sx={{ position: "absolute" }}
                >
                  {registrationStep3Label || "Complete"}
                </Typography>
              </div>
            </Stack>
          )}

          <Title
            fontSize={25}
            title={
              isUserPasswordSet
                ? resetPasswordHeading || "Change a Password"
                : setPasswordHeading || "Set a Password"
            }
          />
          <Box sx={inputBoxStyle}>
            {isUserPasswordSet && (
              <TextField
                autoFocus
                margin="dense"
                id="curPassword"
                label={resetPasswordCurrentLabel || "Current Password"}
                type="password"
                fullWidth
                variant="standard"
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter") {
                    passwordSetHandler();
                  }
                }}
                {...curPassword}
              />
            )}
            <TextField
              margin="dense"
              id="password1"
              label={resetPasswordNewLabel || "New Password"}
              type="password"
              fullWidth
              variant="standard"
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  passwordSetHandler();
                }
              }}
              {...password1}
            />
            <TextField
              margin="dense"
              id="password2"
              label={
                resetPasswordNewConfirmLabel || "New Password Confirmation"
              }
              type="password"
              fullWidth
              variant="standard"
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  passwordSetHandler();
                }
              }}
              {...password2}
            />
            <span style={{ color: passwordNotMatch ? "red" : "green" }}>
              {passwordNotMatch ? (
                "Password is not matched."
              ) : (
                <div>&nbsp;</div>
              )}
            </span>
            <Box
              sx={{
                display: "flex",
                flexDirection: { mobile: "column", tablet: "row" },
                justifyContent: {
                  mobile: "flex-start",
                  tablet: "space-between",
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <NSSButton
                loading={changePasswordloading}
                style={{
                  margin: "40px 20px",
                  borderRadius: "30px",
                }}
                variant="gradient"
                color="primary"
                onClick={passwordSetHandler}
                letterSpacing="1.2px"
              >
                {isUserPasswordSet
                  ? submitBtnText || "SUBMIT"
                  : registerBtnText || "REGISTER"}
              </NSSButton>
            </Box>
          </Box>
        </ResetPasswordContainer>
      )}

      {/* 비밀번호 변경 성공 alert */}
      <TopCenterSnackBar
        value={passwordSetSuccessAlert}
        setValue={setPasswordSetSuccessAlert}
        variant="filled"
        severity="success"
        content="Password successfully changed."
      />
      {/* 비밀번호 확인 alert */}
      <TopCenterSnackBar
        value={passwordNotMatchAlert}
        setValue={setPasswordNotMatchAlert}
        variant="filled"
        severity="error"
        content="Password not match."
      />
      {/* 빈 field alert */}
      <TopCenterSnackBar
        value={emptyAlert}
        setValue={setEmptyAlert}
        variant="filled"
        severity="error"
        content="Please fill all fields."
      />
      {/* 현재 비밀번호 불일치 alert */}
      <TopCenterSnackBar
        value={currentPasswordNotMatchAlert}
        setValue={setCurrentPasswordNotMatchAlert}
        variant="filled"
        severity="warning"
        content="Current password not matched."
      />
      {/* 토큰 만료 alert */}
      <TopCenterSnackBar
        value={tokenNotMatchAlert}
        setValue={setTokenNotMatchAlert}
        variant="filled"
        severity="error"
        content="Token expired."
      />
    </OuterResetContainer>
  );
};

export default ResetPassword;
