import React, { useState, useEffect } from "react";
import { useNavigate } from "hooks/useNavigateWithSearch";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import NSSButton from "components/Button/NSSButton";
import { Box } from "@mui/material";

interface PrivateRouteProps {
  children: React.ReactNode;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivateRoute = ({ children, setEmailModalOpen }: PrivateRouteProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.role === "guest") {
      // alert("You have to sign in first.");
      setEmailModalOpen(true);
    }
  }, []);

  return authState.role !== "guest" ? (
    <>{children} </>
  ) : (
    // <Navigate to={`/${pathname}`} />
    <Box
      className="body-fit"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <NSSButton
        variant="gradient"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go to a previous page
      </NSSButton>
    </Box>
  );
};

export default PrivateRoute;
