/* eslint-disable react/require-default-props */
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AdminNavBar from "components/AdminNavBar/AdminNavBar";
import AdminAppBar from "components/AdminAppBar/AdminAppBar";
import { AdminLayoutContainer } from "./AdminLayoutStyles";
import "css/admin.css";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  isPublished?: boolean;
  menus?: Admin.menuType[];
  applyHandler?: () => void;
  disableApply?: boolean;
}

const AdminLayout = ({
  title,
  children,
  isPublished,
  menus,
  applyHandler,
  disableApply,
}: AdminLayoutProps) => {
  return (
    <AdminLayoutContainer>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminAppBar
          title={title}
          isPublished={isPublished}
          menus={menus}
          applyHandler={applyHandler}
          disableApply={disableApply}
        />
        <AdminNavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
