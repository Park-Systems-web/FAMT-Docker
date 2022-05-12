import React from "react";
import Landing from "pages/common/Landing/Landing";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import KoreaAttend from "pages/korea/KoreaAttend/KoreaAttend";
import LectureHall from "pages/common/LectureHall/LectureHall";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";

const pathname = "kr";
const formNo = "1239";

export default [
  {
    path: `/${pathname}`,
    element: <Landing key={`${pathname}-landing-section`} />,
  },
  {
    path: `/${pathname}/lecture-hall`,
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/exhibit/parksystems`,
    element: <ExhibitParkSystems />,
  },
  {
    path: `/${pathname}/exhibit/nanoscientific`,
    element: <ExhibitNanoScientific />,
  },
  {
    path: `/${pathname}/sponsors`,
    element: <Sponsors />,
  },
  {
    path: `/${pathname}/program`,
    element: <Programs />,
  },
  {
    path: `/${pathname}/speakers`,
    element: <Speakers />,
  },
  {
    path: `/${pathname}/speakers/:id`,
    element: <SpeakerDetail />,
  },
  {
    path: `/${pathname}/registration`,
    element: <Registration formNo={formNo} />,
  },
  {
    path: `/${pathname}/user/reset-password`,
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/user/forgot-password`,
    element: <ForgotPassword />,
  },
];
