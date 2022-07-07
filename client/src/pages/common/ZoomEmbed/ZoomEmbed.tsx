import React, { useEffect, useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { useAuthState } from "context/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// embed

const ZoomEmbed = () => {
  const [currentZoomSignature, setCurrentZoomSignature] = useState<string>("");
  const authState = useAuthState();
  const { webinarId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const getSignature = async () => {
    const sigResult = await axios.post(
      `${process.env.API_URL}/api/zoom/signature`,
      {
        meetingNumber: webinarId,
        role: 0,
      },
    );
    setCurrentZoomSignature(sigResult.data.signature);
  };

  useEffect(() => {
    document.getElementById("zmmtg-root").style.display = "block";
    getSignature();

    return () => {
      document.getElementById("zmmtg-root").style.display = "none";
    };
  }, []);

  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.5.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load("en-US");
    ZoomMtg.i18n.reload("en-US");
    ZoomMtg.init({
      leaveUrl: "http://localhost:8080/join-live",
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: currentZoomSignature,
          meetingNumber: webinarId,
          userName: authState.name,
          // sdkKey: process.env.ZOOM_SDK_KEY,
          sdkKey: "79qww1vO4WaZ9z2QVshSHQJNOQClVbVE5X6B",
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
  }, [currentZoomSignature]);

  return <div />;
};

export default ZoomEmbed;
