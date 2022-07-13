import React, { useEffect, useState } from "react";
// import { ZoomMtg } from "@zoomus/websdk";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { ZoomMtg } from "@zoomus/websdk";

import { useAuthState } from "context/AuthContext";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
// embed

const ZoomEmbed = () => {
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();

  // loads language files, also passes any error messages to the ui
  ZoomMtg.i18n.load("en-US");
  ZoomMtg.i18n.reload("en-US");

  ZoomMtg.setZoomJSLib("https://source.zoom.us/{VERSION_NUMBER}/lib", "/av");

  const [currentZoomSignature, setCurrentZoomSignature] = useState<string>("");
  const authState = useAuthState();
  const { webinarId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const getSignature = async () => {
    try {
      const sigResult = await axios.post(
        `${process.env.API_URL}/api/zoom/signature`,
        {
          meetingNumber: webinarId,
          role: 0,
        },
      );

      setCurrentZoomSignature(sigResult.data.signature);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // document.getElementById("zmmtg-root").style.display = "block";
    getSignature();

    return () => {
      // document.getElementById("zmmtg-root").style.display = "none";
    };
  }, []);

  // useEffect(() => {
  //   const client = ZoomMtgEmbedded.createClient();
  //   const meetingSDKElement = document.getElementById("meetingSDKElement");
  //   const meetingSDKChatElement = document.getElementById(
  //     "meetingSDKChatElement",
  //   );

  //   try {
  //     client.init({
  //       // debug: true,
  //       zoomAppRoot: meetingSDKElement,
  //       language: "en-US",
  //       customize: {
  //         meetingInfo: [
  //           "topic",
  //           "host",
  //           "mn",
  //           "pwd",
  //           "telPwd",
  //           "participant",
  //           "dc",
  //           "enctype",
  //         ],
  //         video: {
  //           popper: {
  //             disableDraggable: true,
  //           },
  //           viewSizes: {
  //             default: {
  //               width: isMobile ? 350 : 1385,
  //               height: 660,
  //             },
  //           },
  //         },
  //         chat: {
  //           popper: {
  //             anchorElement: meetingSDKChatElement,
  //           },
  //         },
  //       },
  //     });

  //     client.join({
  //       sdkKey: process.env.ZOOM_SDK_KEY,
  //       signature: currentZoomSignature,
  //       meetingNumber: webinarId,
  //       password: "",
  //       userName: authState.name,
  //       userEmail: authState.email,
  //       tk: searchParams.get("tk"),
  //     });
  //   } catch (error) {
  //     console.log(error.reason);
  //   }

  //   return () => {
  //     client.leaveMeeting();
  //   };
  // }, [currentZoomSignature]);
  useEffect(() => {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: "https://famt.parksystems.com/lecture-hall",
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: currentZoomSignature,
          meetingNumber: webinarId,
          userName: authState.name,
          sdkKey: process.env.ZOOM_SDK_KEY,
          userEmail: authState.email,
          passWord: "",
          tk: searchParams.get("tk"),
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

    return () => {
      document.getElementById("zmmtg-root").style.display = "none";

      ZoomMtg.leaveMeeting({
        success: () => {
          //
        },
      });
    };
  }, [currentZoomSignature]);

  return (
    <>
      <div id="meetingSDKElement" />
      <div id="meetingSDKChatElement" />
    </>
  );
};

export default ZoomEmbed;
