/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import Link from "components/Link/LinkWithSearch";
import { useNavigate } from "hooks/useNavigateWithSearch";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import CloseButton from "components/CloseButton/CloseButton";
import axios from "axios";
import Timer from "components/Timer/Timer";
import { globalData } from "utils/GlobalData";
import useInput from "hooks/useInput";
import { smallFontSize } from "utils/FontSize";
import usePageViews from "../../hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";

interface ModalProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFailed: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordSetSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
  emailModalOpen: boolean;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordSetModalOpen: boolean;
  setPasswordSetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordInputModalOpen: boolean;
  setPasswordInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransitionRight = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const TransitionLeft = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const EuropeLoginModal = ({
  setSuccess,
  setFailed,
  setPasswordSetSuccessAlert,
  emailModalOpen,
  setEmailModalOpen,
  passwordSetModalOpen,
  setPasswordSetModalOpen,
  passwordInputModalOpen,
  setPasswordInputModalOpen,
}: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);

  // snackbar alert
  const [passwordNotMatchAlert, setPasswordNotMatchAlert] =
    useState<boolean>(false);
  const [emptyAlert, setEmptyAlert] = useState<boolean>(false);
  const [nameNotMatchAlert, setNameNotMatchAlert] = useState<boolean>(false);

  // 인증번호
  const [correctCode, setCorrectCode] = useState<string>("");
  // const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [sendHandlerLoading, setSendHandlerLoading] = useState<boolean>(false);

  // 타이머 관련
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  // alert
  const [emailSentAlert, setEmailSentAlert] = useState<boolean>(false);
  const [emailNotExistAlert, setEmailNotExistAlert] = useState<boolean>(false);
  const [timerExpiredAlert, setTimerExpiredAlert] = useState<boolean>(false);
  const [codeCorrectAlert, setCodeCorrectAlert] = useState<boolean>(false);
  const [codeWrongAlert, setCodeWrongAlert] = useState<boolean>(false);
  const [passwordChangeSuccessAlert, setPasswordChangeSuccessAlert] =
    useState<boolean>(false);

  //
  const pathname = usePageViews();
  const email = useInput("");
  const password = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");
  const verificationCode = useInput("");

  // refs
  const emailFocus = useRef<HTMLInputElement>(null);
  const passwordInputFocus = useRef<HTMLInputElement>(null);
  const passwordSetFocus = useRef<HTMLInputElement>(null);
  const vCodeFocus = useRef<HTMLInputElement>(null);

  // global data
  const {
    signInText,
    emailInputLabel,
    passwordInputLabel,
    forgotPasswordText,
    createAccountText,
    goNextText,
    goPrevText,
  } = globalData.get(pathname) as Common.globalDataType;

  const handleOpen = (setOpen: (val: boolean) => void) => {
    setOpen(true);
  };
  const handleClose = (setOpen: (val: boolean) => void) => {
    setOpen(false);
  };

  // navigate hook
  const navigate = useNavigate();

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
    if (correctCode === verificationCode.value) {
      setIsEmailVerified(true);
      setCodeCorrectAlert(true);
      setIsExpired(true);
    } else {
      setIsEmailVerified(false);
      setCodeWrongAlert(true);
    }
  };

  // 모달 모두 닫아주는 메서드
  const closeAllModal = () => {
    setEmailModalOpen(false);
    setPasswordSetModalOpen(false);
    setPasswordInputModalOpen(false);
  };

  const handlePasswordConfirm = () => {
    if (password1.value !== password2.value) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
    }
  };

  // timer 만료 handler
  const timerExpiredHandler = () => {
    setCorrectCode("");
    setIsTimerStarted(false);
    if (!isEmailVerified) setTimerExpiredAlert(true);
  };

  // 타이머 만료 시 hook
  useEffect(() => {
    if (isExpired) {
      timerExpiredHandler();
    }
  }, [isExpired]);

  const state = useAuthState();
  const dispatch = useAuthDispatch();

  const dispatchLogin = (e: string, r: string, t: string) =>
    dispatch({
      type: "LOGIN",
      authState: {
        ...state,
        isLogin: true,
        role: r,
        email: e,
        accessToken: t,
      },
    });

  const loginHandler = async (email: string, password: string) => {
    setLoading(true);
    axios
      .post(`${process.env.API_URL}/api/users/login`, {
        email,
        password,
        nation: pathname,
      })
      .then((res) => {
        if (res.data.success === true) {
          dispatchLogin(email, res.data.role, res.data.accessToken);
          setSuccess(true);
          setPasswordInputModalOpen(false);
        } else {
          setFailed(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const nextHandler = () => {
    setLoading(true);
    axios
      .post(`${process.env.API_URL}/api/users/passwordset/check`, {
        email: email.value,
        nation: pathname,
      })
      .then((res) => {
        if (res.data.success) {
          if (res.data.result) {
            // password 입력 모달
            setPasswordInputModalOpen(true);
            setEmailModalOpen(false);
          } else {
            // password 설정 모달
            setPasswordSetModalOpen(true);
            setEmailModalOpen(false);
          }
        } else {
          // 유저 없다.
          setFailed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const passwordSetHandler = () => {
    if (passwordNotMatch) {
      setPasswordNotMatchAlert(true);
      return;
    }
    if (
      verificationCode.value === "" ||
      password1.value === "" ||
      password2.value === ""
    ) {
      setEmptyAlert(true);
      return;
    }

    setLoading(true);
    axios
      .post(`${process.env.API_URL}/api/users/passwordset`, {
        email: email.value,
        password: password1.value,
        nation: pathname,
      })
      .then((res) => {
        if (res.data.success) {
          setPasswordSetSuccessAlert(true);
          setPasswordSetModalOpen(false);
        } else {
          setNameNotMatchAlert(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handlePasswordConfirm();
  }, [password1, password2]);

  // 모달 변경 시 focus.
  useEffect(() => {
    if (emailModalOpen) {
      setTimeout(() => {
        const input = emailFocus.current?.children[1]
          .children[0] as HTMLInputElement;
        input.focus();
      }, 10);
    }
  }, [emailModalOpen]);
  useEffect(() => {
    if (passwordInputModalOpen) {
      setTimeout(() => {
        const input = passwordInputFocus.current?.children[1]
          .children[0] as HTMLInputElement;
        input.focus();
      }, 10);
    }
  }, [passwordInputModalOpen]);
  useEffect(() => {
    if (passwordSetFocus) {
      setTimeout(() => {
        const input = passwordSetFocus.current?.children[1]
          .children[0] as HTMLInputElement;
        input.focus();
      }, 10);
    }
  }, [passwordSetModalOpen]);
  return (
    <div>
      {/* {signInText && (
        <NSSButton
          type="button"
          variant="primary"
          style={{ fontWeight: 700 }}
          onClick={() => {
            handleOpen(setEmailModalOpen);
          }}
        >
          {signInText}
        </NSSButton>
      )} */}
      {/* email modal */}
      <Dialog
        open={emailModalOpen}
        onClose={() => {
          handleClose(setEmailModalOpen);
        }}
        TransitionComponent={TransitionRight}
        disableScrollLock
        fullWidth
        maxWidth="tablet"
      >
        <CloseButton setOpen={setEmailModalOpen} />
        <DialogTitle>{signInText || "SIGN IN"}</DialogTitle>
        {emailInputLabel && (
          <DialogContent>
            <TextField
              disabled={!emailModalOpen}
              ref={emailFocus}
              margin="dense"
              id="email"
              label={emailInputLabel}
              type="email"
              fullWidth
              variant="filled"
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  nextHandler();
                }
              }}
              {...email}
            />
          </DialogContent>
        )}
        <DialogActions style={{ flexDirection: "column" }}>
          {loading && (
            <LoadingButton
              loading
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
              color="primary"
            >
              Loading
            </LoadingButton>
          )}
          {!loading && (
            <Button
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
              variant="contained"
              color="primary"
              onClick={nextHandler}
            >
              {goNextText}
            </Button>
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "95%" }}
          >
            {pathname === "eu" ? (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href =
                    "https://www.nanoscientificforum.com/registration";
                }}
              >
                <Typography fontSize={smallFontSize}>
                  {createAccountText}
                </Typography>
              </div>
            ) : (
              <Link to={`${pathname}/registration`} onClick={closeAllModal}>
                <Typography fontSize={smallFontSize}>
                  {createAccountText}
                </Typography>
              </Link>
            )}
            <Link
              to={`${pathname}/user/forgot-password`}
              onClick={closeAllModal}
            >
              <Typography fontSize={smallFontSize}>
                {forgotPasswordText}
              </Typography>
            </Link>
          </Stack>
        </DialogActions>
      </Dialog>

      {/* 비밀번호 입력 모달 */}

      <Dialog
        open={passwordInputModalOpen}
        onClose={() => {
          handleClose(setPasswordInputModalOpen);
        }}
        TransitionComponent={TransitionLeft}
        disableScrollLock
        fullWidth
        maxWidth="tablet"
      >
        <CloseButton setOpen={setPasswordInputModalOpen} />
        <DialogTitle>{signInText || "SIGN IN"}</DialogTitle>
        <DialogContent>
          <TextField
            disabled={!passwordInputModalOpen}
            ref={passwordInputFocus}
            margin="dense"
            id="password"
            label={passwordInputLabel}
            type="password"
            fullWidth
            variant="filled"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                loginHandler(email.value, password.value);
              }
            }}
            {...password}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: "10px", borderRadius: "30px", width: "20%" }}
            variant="outlined"
            color="primary"
            tabIndex={-1}
            onClick={() => {
              handleClose(setPasswordInputModalOpen);
              handleOpen(setEmailModalOpen);
            }}
          >
            {goPrevText}
          </Button>
          <LoadingButton
            loading={loading}
            style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
            variant="contained"
            color="primary"
            onClick={() => {
              loginHandler(email.value, password.value);
            }}
          >
            {signInText || "SIGN IN"}
          </LoadingButton>
        </DialogActions>

        {/* 비밀번호 확인 alert */}
        <TopCenterSnackBar
          value={passwordNotMatchAlert}
          setValue={setPasswordNotMatchAlert}
          variant="filled"
          severity="error"
          content="Password not match."
        />
      </Dialog>

      {/* 패스워드 설정 모달 */}
      <Dialog
        open={passwordSetModalOpen}
        onClose={() => {
          handleClose(setPasswordSetModalOpen);
        }}
        TransitionComponent={TransitionLeft}
        disableScrollLock
        fullWidth
        maxWidth="tablet"
      >
        <CloseButton setOpen={setPasswordSetModalOpen} />
        <DialogTitle>Set Your Password</DialogTitle>
        <DialogContent>
          <TextField
            disabled={!passwordSetModalOpen}
            ref={passwordSetFocus}
            margin="dense"
            id="password1"
            label="New Password"
            type="password"
            fullWidth
            variant="filled"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                passwordSetHandler();
              }
            }}
            {...password1}
          />
          <TextField
            disabled={!passwordSetModalOpen}
            margin="dense"
            id="password2"
            label="Password Confirmation"
            type="password"
            fullWidth
            variant="filled"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                passwordSetHandler();
              }
            }}
            {...password2}
          />
          <span style={{ color: passwordNotMatch ? "red" : "green" }}>
            {passwordNotMatch ? "Password is not matched." : <div>&nbsp;</div>}
          </span>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              sx={{ width: "75%", mr: 1 }}
            >
              <TextField
                disabled={!passwordSetModalOpen || !isTimerStarted}
                ref={vCodeFocus}
                style={{ width: "100%", marginTop: 0 }}
                margin="dense"
                id="v-code"
                label="Verification Code"
                type="text"
                variant="filled"
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter") {
                    passwordSetHandler();
                  }
                }}
                {...verificationCode}
              />
              {isTimerStarted && (
                <LoadingButton
                  sx={{
                    height: "38px",
                  }}
                  color="primary"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={confirmCodeHandler}
                  loading={sendHandlerLoading}
                >
                  Confirm
                </LoadingButton>
              )}
            </Stack>

            {isTimerStarted ? (
              <Timer second={180} setIsExpired={setIsExpired} />
            ) : (
              <Box sx={{ width: "60px" }} />
            )}
            <LoadingButton
              sx={{ borderRadius: "30px", px: 1, py: 0, height: "38px" }}
              color="primary"
              variant="outlined"
              size="small"
              onClick={sendHandler}
              loading={sendHandlerLoading}
            >
              {isTimerStarted ? "RESEND" : "SEND"}
            </LoadingButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: "10px", borderRadius: "30px", width: "20%" }}
            variant="outlined"
            color="primary"
            tabIndex={-1}
            onClick={() => {
              handleClose(setPasswordSetModalOpen);
              handleOpen(setEmailModalOpen);
            }}
          >
            {goPrevText}
          </Button>

          <LoadingButton
            loading={loading}
            style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
            variant="contained"
            color="primary"
            onClick={passwordSetHandler}
            disabled={!isEmailVerified}
          >
            SUBMIT
          </LoadingButton>
        </DialogActions>

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
        {/* 입력한 이름 정보 매칭 실패 */}
        <TopCenterSnackBar
          value={nameNotMatchAlert}
          setValue={setNameNotMatchAlert}
          variant="filled"
          severity="warning"
          content="Name is not matched to your account's data."
        />
        {/* alert */}
        <TopCenterSnackBar
          value={emailSentAlert}
          setValue={setEmailSentAlert}
          variant="filled"
          severity="success"
          content="Verification code sent to your email."
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
      </Dialog>
    </div>
  );
};

export default EuropeLoginModal;
