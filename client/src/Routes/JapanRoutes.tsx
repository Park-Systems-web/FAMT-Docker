import React from "react";
import Landing from "pages/common/Landing/Landing";
import Programs from "pages/common/Programs/Programs";
import JapanExhibitParkSystems from "pages/japan/JapanExhibitParkSystems";
import Sponsors from "pages/common/Sponsors";
import JapanAttend from "pages/japan/JapanAttend/JapanAttend";
import JapanGreeting from "pages/japan/JapanGreeting/JapanGreeting";
import JapanArchive from "pages/japan/JapanArchive/JapanArchive";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import LectureHall from "pages/common/LectureHall/LectureHall";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";
import Speakers from "../pages/common/Speakers/Speakers";

const pathname = "jp";
const formNo = "1223";

export default [
  {
    path: `/${pathname}`,
    element: <Landing key={`${pathname}-landing-section`} />,
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
    path: `/${pathname}/attend`,
    element: <JapanAttend />,
  },
  {
    path: `/${pathname}/program`,
    element: <Programs />,
  },
  {
    path: `/${pathname}/greeting`,
    element: <JapanGreeting />,
  },
  {
    path: `/${pathname}/lecture-hall`,
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/exhibit/parksystems`,
    element: <JapanExhibitParkSystems />,
  },
  {
    path: `/${pathname}/sponsors`,
    element: <Sponsors />,
  },
  {
    path: `/${pathname}/archive`,
    element: <JapanArchive />,
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
  {
    path: `/${pathname}/registration`,
    element: <Registration formNo={formNo} />,
  },
];
