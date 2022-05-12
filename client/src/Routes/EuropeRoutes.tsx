import React from "react";
import Landing from "pages/common/Landing/Landing";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import LectureHall from "pages/common/LectureHall/LectureHall";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";

const pathname = "eu";
const formNo = "1149";

export default [
  {
    path: `/${pathname}`,
    element: <Landing key={`${pathname}-landing-section`} />,
  },
  {
    path: `/${pathname}/registration`,
    element: <EuropeRegistration />,
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
    path: `/${pathname}/user/reset-password`,
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/user/forgot-password`,
    element: <ForgotPassword />,
  },
];
