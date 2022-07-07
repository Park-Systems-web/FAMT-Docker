import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import EventLanding from "pages/common/EventLanding/EventLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import Footer from "components/Footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import useSubPath from "hooks/useSubPath";
import { theme, jpTheme } from "theme/themes";
import PrivateRoute from "components/Route/PrivateRoute";
import LoginModal from "components/Modal/LoginModal";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import NotFound from "pages/common/NotFound/NotFound";
import useMenuStore from "store/MenuStore";
import { CatchingPokemonSharp, Edit } from "@mui/icons-material";
import LandingSection from "components/Section/LandingSection";
import { S3_URL } from "utils/GlobalData";
import { Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadButton from "components/UploadButton/UploadButton";
import { editorRole } from "utils/Roles";
import useSeoTitle from "hooks/useSeoTitle";
import useLoadingStore from "store/LoadingStore";
import { useAuthState, useAuthDispatch } from "./context/AuthContext";
import { useThemeState, useThemeDispatch } from "./context/ThemeContext";
import FamtRoutes from "./Routes/FamtRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import Loading from "./components/Loading/Loading";
import { AppContainer } from "./AppStyles";

interface routeType {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
}

const App = () => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const themeState = useThemeState();
  const navigate = useNavigate();
  // loading store
  const { landingLoading } = useLoadingStore();

  // 로그인 관련
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [bannerURL, setBannerURL] = useState<string>("");
  const [bannerLoading, setBannerLoading] = useState<boolean>(false);
  const [passwordSetSuccessAlert, setPasswordSetSuccessAlert] =
    useState<boolean>(false);
  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const themeObj = theme(themeState.darkMode);
  const themeDispatch = useThemeDispatch();

  // mode
  useEffect(() => {
    themeDispatch({ type: "LIGHTMODE" });
  }, []);

  // 로그인 모달 state
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [passwordSetModalOpen, setPasswordSetModalOpen] =
    useState<boolean>(false);
  const [passwordInputModalOpen, setPasswordInputModalOpen] =
    useState<boolean>(false);

  // subpath 가져오기
  const subpath = useSubPath();

  // banner
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>("");

  const submitBannerHandler = async (imagePath: string) => {
    await axios.post(
      `
    ${process.env.API_URL}/api/page/common/banner`,
      {
        nation: pathname,
        path: encodeURIComponent(
          window.location.pathname.replace(/\/+(\d)+/g, ""),
        ),
        imagePath,
      },
    );
    setBannerURL(imagePath);
  };

  const getBanner = async () => {
    setBannerLoading(true);
    const banner = await axios.get(`
    ${
      process.env.API_URL
    }/api/page/common/banner?nation=${pathname}&path=${encodeURIComponent(
      window.location.pathname.replace(/\/+(\d)+/g, ""),
    )}`);
    if (banner.data.success) {
      setBannerURL(banner.data.result);
    } else {
      setBannerURL("");
    }
    setBannerLoading(false);
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.API_URL}/api/users/check`,
        {
          accessToken: authState.accessToken,
          nation: pathname === "" ? "" : pathname,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data.success !== false) {
          const {
            accessToken,
            email,
            role,
            name,
            isPasswordSet,
            participate_method,
          } = res.data.data;
          if (accessToken !== undefined) {
            authDispatch({
              type: "LOGIN",
              authState: {
                ...authState,
                isLogin: true,
                name,
                email,
                role,
                isOnline:
                  participate_method === "online" || editorRole.includes(role),
                accessToken,
                isPasswordSet,
                isLoading: false,
              },
            });
          }
          // 비밀번호 미설정 시 reset 시키기
          if (!isPasswordSet) {
            navigate("/user/reset-password");
          }
        } else {
          authDispatch({
            type: "LOGOUT",
            authState: {
              ...authState,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        authDispatch({ type: "FINISHLOADING", authState: { ...authState } });
      });
  }, [authState.isLoading, pathname, subpath]);

  useEffect(() => {
    // 스크롤 to top
    window.scrollTo(0, 0);

    // 비밀번호 미설정 시 password set으로 보내기
    // if (authState.isLogin && !authState.isPasswordSet) {
    //   navigate("/user/reset-password");
    // }
  }, [pathname, subpath, window.location.search]);
  // 로그아웃

  const routeLoopHelper = (route: routeType, isPrivate?: boolean) => {
    let resultElement = route.element;
    if (route.isPrivate || isPrivate) {
      resultElement = (
        <PrivateRoute setEmailModalOpen={setEmailModalOpen}>
          {route.element}
        </PrivateRoute>
      );
    }
    return <Route key={route.path} path={route.path} element={resultElement} />;
  };

  // menu state
  const [menuStateLoading, setMenuStateLoading] = useState<boolean>(true);
  const menuStore = useMenuStore();
  const { menuList, currentMenu, setMenuList, setCurrentMenuState } = menuStore;
  useSeoTitle(currentMenu);

  useEffect(() => {
    if (pathname !== "" && pathname !== "home") {
      setMenuStateLoading(true);
      axios
        .get(`${process.env.API_URL}/api/menu/list?nation=${pathname}`)
        .then((res) => {
          setMenuList(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setMenuStateLoading(false);
        });
    }
  }, [pathname]);

  useEffect(() => {
    setCurrentMenuState(window.location.pathname);
  }, [menuList, window.location.href, window.location.pathname]);

  useEffect(() => {
    getBanner();
  }, [bannerURL, window.location.href]);

  if (authState.isLoading || landingLoading)
    return (
      <ThemeProvider theme={themeObj}>
        <Loading />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={themeObj}>
      <AppContainer>
        {window.location.href.indexOf("admin") === -1 && (
          <NavBar
            checkLoading={authState.isLoading}
            passwordSetModalOpen={passwordSetModalOpen}
            emailModalOpen={emailModalOpen}
            setEmailModalOpen={setEmailModalOpen}
            setPasswordSetModalOpen={setPasswordSetModalOpen}
            passwordInputModalOpen={passwordInputModalOpen}
            setPasswordInputModalOpen={setPasswordInputModalOpen}
            setLogoutSuccess={setLogoutSuccess}
            setLogoutLoading={setLogoutLoading}
            menuStateLoading={menuStateLoading}
            hideLectureHall={!authState.isOnline}
          />
        )}
        {!bannerLoading && bannerURL && editorRole.includes(authState.role) && (
          <UploadButton
            setImagePath={setImagePath}
            uploadLoading={uploadLoading}
            setUploadLoading={setUploadLoading}
            uploadPath="famt/common/banner"
            submitHandler={submitBannerHandler}
          >
            <Button
              variant="outlined"
              component="span"
              sx={{
                position: "absolute",
                color: `${themeObj.palette.primary.main}`,
                m: 1,
              }}
            >
              <EditIcon />
            </Button>
          </UploadButton>
        )}
        {!bannerLoading && bannerURL && (
          <LandingSection
            className="banner"
            background={`${S3_URL}/${bannerURL}`}
            maxWidth="1920px"
            fullWidth
          />
        )}
        {!bannerLoading && (
          <Routes>
            {/* Famt */}
            {FamtRoutes.map((route) => {
              return routeLoopHelper(route);
            })}
            {/* admin */}
            {AdminRoutes.map((route) => {
              return routeLoopHelper(route, true);
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}

        <LoginModal
          setSuccess={setLoginSuccess}
          setFailed={setLoginFailed}
          emailModalOpen={emailModalOpen}
          setEmailModalOpen={setEmailModalOpen}
          setPasswordSetSuccessAlert={setPasswordSetSuccessAlert}
          passwordSetModalOpen={passwordSetModalOpen}
          setPasswordSetModalOpen={setPasswordSetModalOpen}
          passwordInputModalOpen={passwordInputModalOpen}
          setPasswordInputModalOpen={setPasswordInputModalOpen}
        />

        {/* alert */}
        <TopCenterSnackBar
          value={loginSuccess}
          setValue={setLoginSuccess}
          variant="filled"
          severity="success"
          content="Successfully signed in."
        />
        <TopCenterSnackBar
          value={loginFailed}
          setValue={setLoginFailed}
          variant="filled"
          severity="error"
          content="User info not matched."
        />
        <TopCenterSnackBar
          value={logoutSuccess}
          setValue={setLogoutSuccess}
          variant="filled"
          severity="info"
          content="Successfully signed out."
        />

        <TopCenterSnackBar
          value={passwordSetSuccessAlert}
          setValue={setPasswordSetSuccessAlert}
          variant="filled"
          severity="success"
          content="Password is successfully set."
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
