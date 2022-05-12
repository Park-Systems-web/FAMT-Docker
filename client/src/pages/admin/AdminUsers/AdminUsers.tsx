import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Box,
  CircularProgress,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { AdminUsersContainer } from "./AdminUsersStyles";
import UserDetailForm from "../Forms/UserDetailForm";
import Loading from "../../../components/Loading/Loading";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AdminUsers = () => {
  const pathname = usePageViews();
  const [users, setUsers] = useState<User.userType[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openUserDetailForm, setOpenUserDetailForm] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User.userType>();
  const [loading, setLoading] = useState<boolean>(false);
  // Avoid a layout jump when reaching the last page with empty rows.

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users?.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const config = {
    params: { nation: pathname },
  };

  const getUsers = async () => {
    const users = await axios.get(
      `${process.env.API_URL}/api/admin/users`,
      config,
    );
    setUsers(users.data as User.userType[]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    getUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminUsersContainer>
      <AdminLayout title="Users">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Email </StyledTableCell>
                <StyledTableCell align="right">name</StyledTableCell>
                <StyledTableCell align="right">institute</StyledTableCell>
                <StyledTableCell align="right">role</StyledTableCell>
                <StyledTableCell align="right">registration </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : users
              ).map((user) => (
                <StyledTableRow
                  key={user.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenUserDetailForm(true);
                  }}
                >
                  <StyledTableCell scope="row">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.last_name} / {user.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.institute}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.role}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.createdAt.substring(0, 10)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={users?.length as number}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </AdminLayout>
      {openUserDetailForm && (
        <UserDetailForm
          openUserDetailForm={openUserDetailForm}
          setOpenUserDetailForm={setOpenUserDetailForm}
          selectedUser={selectedUser as User.userType}
          getUsers={getUsers}
        />
      )}
    </AdminUsersContainer>
  );
};

export default AdminUsers;
