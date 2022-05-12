/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button, Switch } from "@mui/material";
import { useAuthState } from "context/AuthContext";
import { adminRole } from "utils/Roles";

const drawerWidth = 240;

interface AdminAppBarProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  isPublished?: boolean;
  menus?: Admin.menuType[];
  applyHandler?: () => void;
  disableApply?: boolean;
}

const AdminAppBar = ({
  title,
  menus,
  applyHandler,
  disableApply,
}: AdminAppBarProps) => {
  const authState = useAuthState();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {applyHandler && (
          <LoadingButton
            onClick={applyHandler}
            disabled={disableApply}
            color="success"
            variant="contained"
            style={{ marginRight: "20px" }}
          >
            Apply
          </LoadingButton>
        )}

        {menus &&
          menus.map((menu) => (
            <Button
              onClick={menu.clickHandler}
              color="inherit"
              disabled={menu.disabled ? menu.disabled : false}
            >
              {menu.name}
            </Button>
          ))}
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
