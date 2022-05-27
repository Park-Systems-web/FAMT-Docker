import React from "react";
import Landing from "pages/common/Landing/Landing";
import LectureHall from "pages/common/LectureHall/LectureHall";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";

const pathname = "asia";
const formNo = "1247";

export default [
  {
    path: ``,
    element: <Landing key={`${pathname}-landing-section`} />,
  },
  {
    path: `/registration`,
    element: <Registration formNo={formNo} />,
  },
  {
    path: `/program`,
    element: <Programs />,
  },
  {
    path: `/speakers`,
    element: <Speakers />,
  },
  {
    path: `/speakers/:id`,
    element: <SpeakerDetail />,
  },
  {
    path: `/lecture-hall`,
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: `/user/reset-password`,
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: `/user/forgot-password`,
    element: <ForgotPassword />,
  },
];
