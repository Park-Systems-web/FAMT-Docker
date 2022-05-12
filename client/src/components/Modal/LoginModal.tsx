import React, { useState } from "react";
import Link from "components/Link/LinkWithSearch";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";

interface ModalProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFailed: React.Dispatch<React.SetStateAction<boolean>>;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 280,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ setSuccess, setFailed }: ModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const pathname = usePageViews();
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPassword(e.target.value);
  };

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
        } else {
          setFailed(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="menu-link remember-prev"
        onClick={handleOpen}
      >
        SIGN IN
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableScrollLock // overflow, padding right 버그
      >
        <Fade in={open}>
          <Box sx={style}>
            <IconButton
              style={{ position: "absolute", right: 0, top: 0 }}
              aria-label="close"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                required
                variant="outlined"
                onChange={handleEmailChange}
              />
              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
                required
                onChange={handlePasswordChange}
              />
              {!loading && (
                <Button
                  style={{ margin: "10px", borderRadius: "30px" }}
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    loginHandler(email, password);
                  }}
                >
                  Login
                </Button>
              )}
              {loading && (
                <LoadingButton
                  loading
                  style={{ margin: "10px", borderRadius: "30px" }}
                  // variant="outlined"
                  color="primary"
                >
                  Loading
                </LoadingButton>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <Link to="/#"> Forgot Your Password?</Link> */}
                <Link to={`${pathname}/registration`}> Create an Account</Link>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default LoginModal;
