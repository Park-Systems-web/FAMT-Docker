import { Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";
import Loading from "components/Loading/Loading";
import SpeakerImage from "components/SpeakerImage/SpeakerImage";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import InnerHTML from "dangerously-set-html-content";
import LandingSection from "components/Section/LandingSection";
import { globalData } from "utils/GlobalData";
import { SpeakerDetailContainer } from "./SpeakerDetailStyles";

const SpeakerDetail = () => {
  const { id } = useParams();
  const pathname = usePageViews();
  const theme = useTheme();

  const [speakerData, setSpeakerData] =
    useState<Speaker.speakerDetailType>(null);
  const [speakerLoading, setSpeakerLoading] = useState<boolean>(true);

  const { speakerBannerURL } = globalData.get(
    "common",
  ) as Common.globalDataType;

  const getSpeakerDetailById = () => {
    setSpeakerLoading(true);
    axios
      .get(
        `${process.env.API_URL}/api/page/common/speakers/detail?nation=${pathname}&id=${id}`,
      )
      .then((res) => setSpeakerData(res.data.result))
      .catch((err) => console.log(err))
      .finally(() => {
        setSpeakerLoading(false);
      });
  };

  useEffect(() => {
    getSpeakerDetailById();
  }, []);

  return (
    <SpeakerDetailContainer className="body-fit">
      {speakerLoading && <Loading />}
      {!speakerLoading && (
        <>
          <LandingSection
            className="banner"
            background={speakerBannerURL}
            maxWidth="1920px"
            fullWidth
          />
          <Stack className="layout body-fit">
            <Stack
              mb={2}
              sx={{
                flexDirection: {
                  mobile: "column",
                  laptop: "row",
                },
                alignItems: {
                  mobile: "center",
                  laptop: "initial",
                },
              }}
            >
              <SpeakerImage
                src={speakerData.image_path}
                alt={speakerData.name}
                className="speaker-image-container"
              />
              <Stack>
                <Typography fontSize={subHeadingFontSize} mb={2}>
                  {speakerData.name}:{" "}
                  <span
                    style={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  >
                    {speakerData.title}
                  </span>
                </Typography>
                <Typography className="editor-content" fontSize={mainFontSize}>
                  <InnerHTML html={speakerData.belong} />
                </Typography>
              </Stack>
            </Stack>
            <Typography
              className="editor-content"
              fontSize={smallFontSize}
              lineHeight={1.7}
              color={theme.palette.grey[600]}
            >
              <InnerHTML html={speakerData.description} />
            </Typography>
          </Stack>
        </>
      )}
    </SpeakerDetailContainer>
  );
};

export default SpeakerDetail;
