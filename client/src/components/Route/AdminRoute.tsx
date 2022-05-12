import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import useSubPath from "hooks/useSubPath";
import { editorRole } from "utils/Roles";
import axios from "axios";
import Loading from "components/Loading/Loading";
import ComingSoon from "components/ComingSoon/ComingSoon";

interface AdminRouteProps {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  redirect?: string;
}

const AdminRoute = ({ children, redirect }: AdminRouteProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const subPath = useSubPath();
  const navigate = useNavigate();
  const [isPublishedRoute, setIsPublishedRoute] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const isAdminRoute = subPath.split("/").indexOf("admin") !== -1;
  const isUserAdmin = editorRole.includes(authState.role);

  useEffect(() => {
    setLoading(true);
    if (!isAdminRoute) {
      axios
        .post(`${process.env.API_URL}/api/menu/admin`, {
          nation: pathname,
          path: subPath,
        })
        .then((res) => {
          setIsPublishedRoute(res.data.result ? 1 : 0);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsPublishedRoute(1);
      setLoading(false);
    }
  }, []);

  return (
    <>
      {(loading || isPublishedRoute === -1) && <Loading />}
      {(!loading && (isPublishedRoute === 1 || isAdminRoute)) || isUserAdmin ? (
        <>{children} </>
      ) : (
        <div className="layout body-fit">
          <ComingSoon />
        </div>
      )}
    </>
  );
};

export default AdminRoute;
