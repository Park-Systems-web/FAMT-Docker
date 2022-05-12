import { Stack, Switch, Typography } from "@mui/material";
import axios from "axios";
import AdminLayout from "components/AdminLayout/AdminLayout";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminMenusContainer } from "./AdminMenusStyles";

interface adminMenuType extends Common.menuType {
  isChanged: boolean;
}
const AdminMenus = () => {
  const pathname = usePageViews();
  const [menuList, setMenuList] = useState<adminMenuType[]>(null);
  const [menuListLoading, setMenuListLoading] = useState<boolean>(true);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [applyLoading, setApplyLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/api/menu/list?nation=${pathname}`)
      .then((res) => {
        const menusCpy = res.data.result as adminMenuType[];
        menusCpy.forEach((menu) => {
          // eslint-disable-next-line no-param-reassign
          menu.isChanged = false;
        });
        setMenuList(menusCpy);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMenuListLoading(false);
      });
  }, []);

  const checkIsChanged = () => {
    let result = false;
    if (menuList) {
      menuList.forEach((menu) => {
        result ||= menu.isChanged;
        console.log(result, menu.isChanged);
      });
    }
    return result;
  };

  const applyHandler = () => {
    setApplyLoading(true);
    axios
      .post(`${process.env.API_URL}/api/menu/list`, {
        nation: pathname,
        menus: menuList,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setApplyLoading(false);
      });
  };

  useEffect(() => {
    setIsChanged(checkIsChanged());
  }, [menuList]);

  return (
    <AdminMenusContainer className="body-fit">
      <AdminLayout
        title="Menus"
        applyHandler={
          applyHandler
          // () => {
          //
          // }
        }
        disableApply={!isChanged}
      >
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>name</TableCell>
                <TableCell>path</TableCell>
                <TableCell>Published?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!menuListLoading &&
                menuList &&
                menuList.map((menu, index) => (
                  <TableRow key={`${menu.name}-${menu.id}`}>
                    <TableCell>{menu.id}</TableCell>
                    <TableCell>{menu.name}</TableCell>
                    <TableCell>{menu.path}</TableCell>
                    <TableCell>
                      <Switch
                        checked={menu.is_published === 1}
                        color="default"
                        onClick={() => {
                          const menuListCpy = [...menuList];
                          menuListCpy[index] = {
                            ...menu,
                            is_published: menu.is_published === 1 ? 0 : 1,
                            isChanged: true,
                          };
                          setMenuList(menuListCpy);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AdminLayout>
    </AdminMenusContainer>
  );
};

export default AdminMenus;
