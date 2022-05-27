import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Admin from "pages/admin/Admin";
import AdminPrograms from "pages/admin/AdminPrograms/AdminPrograms";
import AdminSpeakers from "pages/admin/AdminSpeakers/AdminSpeakers";
import AdminMenus from "pages/admin/AdminMenus/AdminMenus";
import AdminUsers from "../pages/admin/AdminUsers/AdminUsers";

// 어드민이어야 접근가능한 element 들을 모아둔 라우츠 입니다.
// App.tsx 에서 이것을 호출합니다
// components 폴더에 있는 AdminRoute 와 PrivateRoute 와는 다른것입니다.

export default [
  {
    path: "/admin",
    element: (
      <AdminRoute key="/admin">
        <Admin />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/program",
    element: (
      <AdminRoute key="/admin/program">
        <AdminPrograms />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/speakers",
    element: (
      <AdminRoute key="/admin/speakers">
        <AdminSpeakers />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/users",
    element: (
      <AdminRoute key="/admin/users">
        <AdminUsers />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/menus",
    element: (
      <AdminRoute key="/admin/menus">
        <AdminMenus />
      </AdminRoute>
    ),
  },
];
