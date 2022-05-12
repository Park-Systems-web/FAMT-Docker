import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Title from "components/Title/Title";
import { TextField, Box, Fade, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import useInput from "hooks/useInput";
import Timer from "components/Timer/Timer";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import CircularProgress from "@mui/material/CircularProgress";
import NSSButton from "components/Button/NSSButton";
import { ForgotPasswordContainer } from "./ForgotPasswordStyles";

const ForgotPassword = () => {
  // 이메일 확인, 인증번호 발송 관련
  const email = useInput("");
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [sendHandlerLoading, setSendHandlerLoading] = useState<boolean>(false);

  // 인증번호 확인 관련
  const code = useInput("");
  const [correctCode, setCorrectCode] = useState<string>("");
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  // 타이머 관련
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  // 비밀번호 재설정 관련
  const password1 = useInput("");
  const password2 = useInput("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
  const [submitPasswordHandlerLoading, setSubmitPasswordHandlerLoading] =
    useState<boolean>(false);

  // alert 관련
  const [emailSentAlert, setEmailSentAlert] = useState<boolean>(false);
  const [emailNotExistAlert, setEmailNotExistAlert] = useState<boolean>(false);
  const [timerExpiredAlert, setTimerExpiredAlert] = useState<boolean>(false);
  const [codeCorrectAlert, setCodeCorrectAlert] = useState<boolean>(false);
  const [codeWrongAlert, setCodeWrongAlert] = useState<boolean>(false);
  const [passwordChangeSuccessAlert, setPasswordChangeSuccessAlert] =
    useState<boolean>(false);

  const pathname = usePageViews();
  const navigate = useNavigate();

  // password ref
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // password focus
  useEffect(() => {
    if (isEmailVerified) {
      setTimeout(() => {
        const input = passwordInputRef.current?.children[1]
          .children[0] as HTMLInputElement;
        input.focus();
      }, 10);
    }
  }, [isEmailVerified]);

  // 인증 이메일 보내기 버튼 handler
  const sendHandler = async () => {
    setIsExpired(false);
    setSendHandlerLoading(true);
    try {
      const res = await axios.post(
        `${process.env.API_URL}/api/mail/vcode/send`,
        {
          email: email.value,
          nation: pathname,
        },
      );
      if (res.data.result) {
        // 인증번호 세팅
        setCorrectCode(res.data.code);
        setShowCodeInput(true);
        setEmailSentAlert(true);
        setIsTimerStarted(true);
      } else {
        // alert: 이메일이 존재하지 않아요
        setEmailNotExistAlert(true);
      }
    } catch (err) {
      alert(err);
    } finally {
      setSendHandlerLoading(false);
    }
  };

  // 인증번호 확인 버튼 handler
  const confirmCodeHandler = () => {
    if (correctCode === code.value) {
      setIsEmailVerified(true);
      setCodeCorrectAlert(true);
      setIsExpired(true);
    } else {
      setIsEmailVerified(false);
      setCodeWrongAlert(true);
    }
  };

  // 비밀번호 제출 handler
  const submitPasswordHandler = async () => {
    try {
      setSubmitPasswordHandlerLoading(true);
      const res = await axios.post(
        `${process.env.API_URL}/api/users/passwordforgot`,
        {
          email: email.value,
          password: password1.value,
          nation: pathname,
        },
      );
      setPasswordChangeSuccessAlert(true);
      // 1.5초 후 홈으로.
      setTimeout(() => {
        navigate(`/${pathname}`);
      }, 1500);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitPasswordHandlerLoading(false);
    }
  };

  // timer 만료 handler
  const timerExpiredHandler = () => {
    setCorrectCode("");
    setIsTimerStarted(false);
    if (!isEmailVerified) setTimerExpiredAlert(true);
  };

  // effect hook

  // email validation
  useEffect(() => {
    setEmailValidation(
      email.value.indexOf("@") !== -1 &&
        email.value.indexOf("@") < email.value.lastIndexOf("."),
    );
  }, [email.value]);

  // password validation
  useEffect(() => {
    setIsPasswordSame(password1.value === password2.value);
  }, [password1.value, password2.value]);

  // 타이머 만료 시 hook
  useEffect(() => {
    if (isExpired) {
      timerExpiredHandler();
    }
  }, [isExpired]);

  return (
    <ForgotPasswordContainer className="body-fit">
      {/* Step 1. 이메일 확인 */}
      {!isEmailVerified && (
        <Fade in={!isEmailVerified}>
          <Box>
            <Title title="Forgot Your Password?" fontSize={22} />
            <Stack direction="row" className="email-section">
              <TextField
                autoFocus
                id="email"
                label="Email Address"
                variant="filled"
                size="small"
                disabled={isEmailVerified}
                fullWidth
                error={!emailValidation}
                sx={{
                  mr: 2,
                }}
                {...email}
              />
              <LoadingButton
                disabled={!emailValidation || isEmailVerified}
                loading={sendHandlerLoading}
                variant="contained"
                color="info"
                onClick={sendHandler}
                size="small"
              >
                Send
              </LoadingButton>
            </Stack>
            {showCodeInput && (
              <>
                <Stack
                  direction="row"
                  className="code-section"
                  sx={{ position: "relative" }}
                >
                  <TextField
                    id="code"
                    label="Verification Code"
                    variant="filled"
                    size="small"
                    disabled={isEmailVerified}
                    fullWidth
                    sx={{
                      mr: 2,
                    }}
                    {...code}
                  />
                  <LoadingButton
                    disabled={isExpired || isEmailVerified}
                    variant="contained"
                    color="info"
                    onClick={confirmCodeHandler}
                    size="small"
                    loadingIndicator={
                      <CircularProgress variant="determinate" value={50} />
                    }
                  >
                    Confirm
                  </LoadingButton>
                  {/* 타이머 */}
                  {isTimerStarted && (
                    <Box
                      sx={{ position: "absolute", right: "-60px", top: "6px" }}
                    >
                      <Timer second={180} setIsExpired={setIsExpired} />
                    </Box>
                  )}
                </Stack>

                {/* {!isTimerStarted && <Box sx={{ width: "48px" }} />} */}
              </>
            )}
          </Box>
        </Fade>
      )}
      {/* Step 2. 비밀번호 재설정 */}
      {isEmailVerified && (
        <Fade in={isEmailVerified}>
          <Stack
            className="password-section"
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Title title="Reset Your Password" fontSize={22} />
            <TextField
              ref={passwordInputRef}
              id="password1"
              type="password"
              label="New Password"
              variant="filled"
              size="small"
              fullWidth
              disabled={submitPasswordHandlerLoading}
              sx={{
                mr: 2,
              }}
              {...password1}
            />
            <TextField
              id="password2"
              type="password"
              label="New Password Confirmation"
              variant="filled"
              size="small"
              fullWidth
              disabled={submitPasswordHandlerLoading}
              error={!isPasswordSame}
              sx={{
                mr: 2,
              }}
              {...password2}
            />
            <NSSButton
              disabled={
                !isPasswordSame ||
                password1.value === "" ||
                password2.value === ""
              }
              loading={submitPasswordHandlerLoading}
              variant="gradient"
              color="info"
              onClick={submitPasswordHandler}
              letterSpacing="1.2px"
            >
              SUBMIT
            </NSSButton>
          </Stack>
        </Fade>
      )}

      {/* alert */}
      <TopCenterSnackBar
        value={emailSentAlert}
        setValue={setEmailSentAlert}
        variant="filled"
        severity="success"
        content="Verification code sent to your email."
      />
      <TopCenterSnackBar
        value={emailNotExistAlert}
        setValue={setEmailNotExistAlert}
        variant="filled"
        severity="warning"
        content="The email does not exist."
      />
      <TopCenterSnackBar
        value={timerExpiredAlert}
        setValue={setTimerExpiredAlert}
        variant="filled"
        severity="warning"
        content="Please resend verification email."
      />
      <TopCenterSnackBar
        value={codeCorrectAlert}
        setValue={setCodeCorrectAlert}
        variant="filled"
        severity="success"
        content="Email verified."
      />
      <TopCenterSnackBar
        value={codeWrongAlert}
        setValue={setCodeWrongAlert}
        variant="filled"
        severity="error"
        content="The code is wrong. Please check again."
      />
      <TopCenterSnackBar
        value={passwordChangeSuccessAlert}
        setValue={setPasswordChangeSuccessAlert}
        variant="filled"
        severity="success"
        content="Password successfully changed. Please sign in again."
      />
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
