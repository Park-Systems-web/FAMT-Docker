import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
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
import { CatchingPokemonSharp } from "@mui/icons-material";
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

  // 로그인 관련
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [passwordSetSuccessAlert, setPasswordSetSuccessAlert] =
    useState<boolean>(false);
  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const themeObj = theme(themeState.darkMode);
  const jpThemeObj = jpTheme(themeState.darkMode);
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
          const { accessToken, email, role } = res.data.data;
          if (accessToken !== undefined) {
            authDispatch({
              type: "LOGIN",
              authState: {
                ...authState,
                isLogin: true,
                email,
                role,
                accessToken,
                isLoading: false,
              },
            });
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
  // const [menuList, setMenuList] = useState<Common.menuType[]>(null);
  const menuStore = useMenuStore();
  const { menuList, currentMenu, setMenuList, setCurrentMenuState } = menuStore;
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
  }, [menuList, window.location.href]);

  if (authState.isLoading) return <Loading />;

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
          />
        )}
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
