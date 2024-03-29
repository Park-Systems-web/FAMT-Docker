/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "components/Link/LinkWithSearch";
import { useNavigate } from "hooks/useNavigateWithSearch";
import { NavBarContainer } from "components/NavBar/NavBarStyles";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import { LoadingButton } from "@mui/lab";
import { editorRole } from "utils/Roles";
import useSubPath from "hooks/useSubPath";
import {
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Stack,
  Box,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import MenuLink from "components/Link/MenuLink";
import { globalData } from "utils/GlobalData";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { mainFontSize } from "utils/FontSize";
import PublicIcon from "@mui/icons-material/Public";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMenuStore from "store/MenuStore";
import LoginModal from "../Modal/LoginModal";
import MobileNavBar from "./MobileNavBar";

interface navProps {
  checkLoading: boolean;
  passwordSetModalOpen: boolean;
  emailModalOpen: boolean;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordSetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordInputModalOpen: boolean;
  setPasswordInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoutLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoutSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  menuStateLoading: boolean;
  hideMenu?: boolean;
  hideLectureHall?: boolean;
}

const NavBar = ({
  checkLoading,
  hideMenu,
  emailModalOpen,
  setEmailModalOpen,
  passwordSetModalOpen,
  setPasswordSetModalOpen,
  passwordInputModalOpen,
  setPasswordInputModalOpen,
  setLogoutSuccess,
  setLogoutLoading,
  menuStateLoading,
  hideLectureHall = false,
}: navProps) => {
  // menu list
  // const [menuList, setMenuList] = useState<menuType[]>(null);
  const menuStore = useMenuStore();
  const { menuList } = menuStore;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);
  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);

  const pathname = usePageViews();
  const subpath = useSubPath();
  const navigate = useNavigate();
  const theme = useTheme();

  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const logoutHandler = async (email: string) => {
    setLogoutLoading(true);
    axios
      .post(
        `${process.env.API_URL}/api/users/logout`,
        {
          email,
          nation: pathname,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data.success === true) {
          authDispatch({ type: "LOGOUT", authState });
          setLogoutSuccess(true);
        } else {
          alert(`Error: ${res.data.message}`);
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLogoutLoading(false);
        navigate(0);
      });
  };

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const {
    logoURL,
    speakers,
    programs,
    lectureHall,
    exhibitHall,
    sponsors,
    greeting,
    attend,
    symposium,
    archive,
    registration,
    signInText,
    adminBtnText,
    signOutBtnText,
    changePasswordBtnText,
  } = globalData.get(pathname) as Common.globalDataType;

  return (
    <NavBarContainer className={`${openMobileNav ? "mobile" : ""}`}>
      {!menuStateLoading && (
        <Stack
          direction="row"
          alignItems="center"
          className="nav-wrap"
          justifyContent="center"
        >
          <IconButton className="mobile-menu-btn" onClick={toggleMobileNav}>
            <MenuIcon />
          </IconButton>
          <Link
            to="/"
            className={`${hideMenu ? "logo-link disabled" : "logo-link"}`}
            style={{ padding: "0px", marginRight: "20px" }}
          >
            <img src={logoURL} alt="logo" />
          </Link>
          {!hideMenu && (
            <div className="menu-container">
              <Stack
                direction="row"
                alignSelf="flex-end"
                className="menu-item-wrap"
              >
                {menuList.map((menu) => {
                  if (menu.name !== "Join Live" || !hideLectureHall) {
                    return (
                      <MenuLink
                        key={menu.name}
                        to={`${menu.path}`}
                        // published={
                        //   menu.is_published === 1 ||
                        //   editorRole.includes(authState.role)
                        // }
                      >
                        {menu.name.toUpperCase()}
                      </MenuLink>
                    );
                  }
                  return null;
                })}
                {authState.isLogin && !checkLoading && (
                  <div className="user-menu-wrap">
                    <NSSButton
                      id="basic-button"
                      className="user-menu"
                      type="button"
                      variant="icon"
                      onClick={handleUserMenuClick}
                      aria-controls={openUserMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openUserMenu ? "true" : undefined}
                    >
                      <PersonIcon />
                    </NSSButton>
                    <Menu
                      id="basic-menu"
                      open={openUserMenu}
                      onClose={handleUserMenuClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      anchorEl={anchorEl}
                      disableScrollLock
                    >
                      <MenuList dense>
                        <MenuItem
                          onClick={() => {
                            handleUserMenuClose();
                            navigate(`/user/reset-password`);
                          }}
                        >
                          {changePasswordBtnText || "Change Password"}
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    {editorRole.includes(authState.role) && (
                      <NSSButton
                        type="button"
                        variant="primary"
                        style={{ fontWeight: 700 }}
                        // onClick={() => {
                        //   navigate(`/admin`);
                        // }}
                      >
                        <Link
                          to="/admin"
                          style={{ padding: 0, color: "black" }}
                        >
                          {adminBtnText || "ADMIN"}
                        </Link>
                      </NSSButton>
                    )}

                    <NSSButton
                      type="button"
                      variant="primary"
                      style={{ fontWeight: 700 }}
                      onClick={() => {
                        logoutHandler(authState.email);
                      }}
                    >
                      {signOutBtnText || "SIGN OUT"}
                    </NSSButton>
                  </div>
                )}
                {!authState.isLogin && !checkLoading && (
                  <div className="user-menu-wrap">
                    {signInText && (
                      <NSSButton
                        type="button"
                        variant="primary"
                        style={{ fontWeight: 700 }}
                        onClick={() => {
                          setEmailModalOpen(true);
                        }}
                      >
                        {signInText}
                      </NSSButton>
                    )}

                    {registration && (
                      <NSSButton
                        variant="gradient"
                        onClick={() => {
                          navigate(`/registration`);
                        }}
                        style={{ alignSelf: "center" }}
                        fontSize={mainFontSize}
                        fontWeight={theme.typography.fontWeightBold}
                        letterSpacing="1.2px"
                      >
                        {registration}
                      </NSSButton>
                    )}
                  </div>
                )}
              </Stack>
            </div>
          )}
        </Stack>
      )}
      <Box
        className="overlay"
        sx={{
          backgroundColor: "#000",
          position: "absolute",
        }}
        onClick={() => {
          setOpenMobileNav(false);
        }}
      />
    </NavBarContainer>
  );
};

export default NavBar;
