import React from "react";
import Landing from "pages/common/Landing/Landing";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import LectureHall from "pages/common/LectureHall/LectureHall";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import Registration from "pages/common/Registration/Registration";

export default [
  {
    path: "/americas",
    element: <Landing key="americas-landing-section" />,
  },
  {
    path: "/americas/speakers",
    element: <Speakers />,
  },
  {
    path: "/americas/program",
    element: <Programs />,
  },
  {
    path: "/americas/lecture-hall",
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: "/americas/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/americas/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/americas/registration",
    element: <Registration formNo="1184" />,
  },
  {
    path: "/americas/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/americas/user/reset-password",
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: "/americas/user/forgot-password",
    element: <ForgotPassword />,
  },
];
