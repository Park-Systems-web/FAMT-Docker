import React, { useState, useEffect } from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "utils/GlobalData";
import LandingTitle from "components/Title/LandingTitle";
import LandingSection from "components/Section/LandingSection";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import CookieConsent, { Cookies } from "react-cookie-consent";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";

// import { LiveChatWidget } from "@livechat/widget-react";
import {
  subHeadingFontSize,
  mainFontSize,
  smallFontSize,
  headingFontSize,
} from "utils/FontSize";
import { SpeakersContainer } from "../Speakers/SpeakersStyles";

const Landing = () => {
  const pathname = usePageViews();
  const theme = useTheme();

  const {
    home,
    registration,
    fullDate,
    eventLocation,
    showLandingSection2,
    showLandingSection3,
    showLandingSection4,
    showLandingSection5,
    showLandingSection6,
    showLandingSection7,
    landingSection1Desc,
    landingSection1LogoURL,
    landingSection1BackgroundURL,
    landingSection2Title,
    landingSection2Desc,
    landingSection2Video,
    landingSection3Title,
    landingSection3Desc,
    landingSection4Title,
    landingSection4List1Title,
    landingSection4List1,
    landingSection4List2Title,
    landingSection4List2,
    landingSection4List3Title,
    landingSection4List3,
    landingSection5Title,
    landingSection6Title,
    landingSection6Desc,
    landingSection6ButtonText,
    landingSection6ButtonLink,
    landingSection6Videos,
    landingSection7Title,
    landingSection7Sponsors,
    cookieConsentText,
    seePrivacyPolicyText,
  } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(home as string);

  const navigate = useNavigate();

  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker.speakerType[]>(
    [],
  );

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.API_URL}/api/page/common/speakers/keynote?nation=${pathname}`,
      )
      .then((res) => {
        setKeynoteSpeakers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <LandingSection
        fullWidth
        maxWidth="1920px"
        background={landingSection1BackgroundURL}
        className="section1"
      >
        <div className="overlay secondary z0" />
        <Stack
          className="layout"
          direction="column"
          alignItems="center"
          spacing={5}
          sx={{ padding: { laptop: "135px 50px !important" } }}
        >
          <img
            className="z1"
            src={landingSection1LogoURL}
            alt="logo"
            style={{
              maxWidth: "600px",
              height: "300px",
              width: "100%",
              minWidth: "200px",
            }}
          />
          <Stack
            sx={{
              flexDirection: {
                mobile: "column",
                laptop: "row",
              },
              backgroundColor: theme.palette.common.white,
              padding: "0 10px",
            }}
            style={{ marginTop: 0 }}
            alignItems="center"
          >
            {eventLocation !== undefined && (
              <>
                <Typography
                  fontSize={headingFontSize}
                  fontWeight={700}
                  color={theme.palette.primary.darkText}
                >
                  {eventLocation}
                </Typography>
                <Typography
                  sx={{
                    display: { mobile: "none", laptop: "inline-block" },
                    margin: "0 8px",
                  }}
                  fontWeight={700}
                  fontSize={subHeadingFontSize}
                  color={theme.palette.primary.darkText}
                >
                  |
                </Typography>
              </>
            )}
            <Typography
              fontSize={headingFontSize}
              fontWeight={700}
              color={theme.palette.primary.darkText}
            >
              {fullDate}
            </Typography>
          </Stack>
          {registration && (
            <NSSButton
              className="z1"
              variant="gradient"
              style={{ padding: "5px 20px" }}
              fontSize={mainFontSize}
              fontWeight={theme.typography.fontWeightBold}
              letterSpacing="1.2px"
              onClick={() => {
                navigate(`/${pathname}/registration`);
              }}
            >
              {registration}
            </NSSButton>
          )}
          <Typography
            className="z1"
            textAlign="center"
            color={theme.palette.common.white}
            fontWeight={theme.typography.fontWeightMedium}
            fontSize={headingFontSize}
          >
            {landingSection1Desc && <InnerHTML html={landingSection1Desc} />}
          </Typography>
        </Stack>
      </LandingSection>
      {showLandingSection2 && (
        <LandingSection fullWidth>
          <Stack
            className="layout"
            flexDirection={{
              mobile: "column-reverse",
              tablet: "row",
            }}
            maxWidth="1920px"
            alignItems="center"
            justifyContent="space-between"
            spacing={{ mobile: 5, tablet: 0 }}
          >
            <Stack
              flexDirection="column"
              width="100%"
              height="100%"
              sx={{
                mr: {
                  mobile: 0,
                  tablet: 5,
                },
              }}
              // width={{
              //   tablet: "55%",
              //   mobile: "100%",
              // }}
              // height={{
              //   tablet: "100%",
              //   mobile: "55%",
              // }}
            >
              <LandingTitle title={landingSection2Title || ""} />
              <Box fontSize={mainFontSize}>
                <InnerHTML html={landingSection2Desc || ""} />
              </Box>
            </Stack>
            {/* {landingSection2Video && (
                <Stack
                  sx={{
                    display: "flex",
                    width: {
                      tablet: "40%",
                      mobile: "100%",
                    },
                    height: {
                      tablet: "100%",
                      mobile: "40%",
                    },
                    position: "relative",
                  }}
                >
                  <Box
                    className="z1"
                    sx={{
                      width: "100%",
                      height: "100%",
                      mb: { mobile: 4, tablet: 0 },
                    }}
                  >
                    <YoutubeEmbed
                      embedId={landingSection2Video}
                      width="400"
                      height="250"
                    />
                  </Box>
                </Stack>
              )} */}
          </Stack>
        </LandingSection>
      )}
      {showLandingSection3 && (
        <LandingSection fullWidth maxWidth="1920px">
          <Box className="layout">
            {landingSection3Title && (
              <LandingTitle title={landingSection3Title} />
            )}
            {landingSection3Desc && (
              <Typography fontSize={mainFontSize}>
                <InnerHTML html={landingSection3Desc} />
              </Typography>
            )}
          </Box>
        </LandingSection>
      )}
      {showLandingSection4 && (
        <LandingSection fullWidth maxWidth="1920px">
          <Stack className="layout" direction="column">
            {landingSection4Title && (
              <LandingTitle title={landingSection4Title} textAlign="left" />
            )}
            <Stack
              direction={{ mobile: "column", laptop: "row" }}
              flexWrap="wrap"
              justifyContent="space-between"
              sx={{
                color: theme.palette.common.white,
              }}
            >
              <Box
                className="gradient-box"
                sx={{
                  width: { laptop: "25%" },
                  p: 3,
                  mb: { mobile: 5, laptop: 0 },
                }}
              >
                <Typography
                  fontSize={subHeadingFontSize}
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {landingSection4List1Title}
                </Typography>
                <ul style={{ marginInlineStart: "35px" }}>
                  {landingSection4List1?.map((item) => (
                    <li style={{ marginBottom: "15px" }}>
                      <Typography
                        fontWeight={theme.typography.fontWeightMedium}
                        fontSize={smallFontSize}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              <Box
                className="gradient-box"
                sx={{
                  width: { laptop: "25%" },
                  p: 3,
                  mb: { mobile: 5, laptop: 0 },
                }}
              >
                <Typography
                  fontSize={subHeadingFontSize}
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {landingSection4List2Title}
                </Typography>
                <ul style={{ marginInlineStart: "35px" }}>
                  {landingSection4List2?.map((item) => (
                    <li style={{ marginBottom: "15px" }}>
                      <Typography
                        fontWeight={theme.typography.fontWeightMedium}
                        fontSize={smallFontSize}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              <Box
                className="gradient-box"
                sx={{
                  width: { laptop: "25%" },
                  p: 3,
                }}
              >
                <Typography
                  fontSize={subHeadingFontSize}
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {landingSection4List3Title}
                </Typography>
                <ul style={{ marginInlineStart: "35px" }}>
                  {landingSection4List3?.map((item) => (
                    <li style={{ marginBottom: "15px" }}>
                      <Typography
                        fontSize={smallFontSize}
                        fontWeight={theme.typography.fontWeightMedium}
                      >
                        <InnerHTML html={item} />
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Stack>
          </Stack>
        </LandingSection>
      )}
      {/* </BackgroundVectorColored> */}

      {/* <BackgroundVectorColoredReversed maxWidth="1920px"> */}
      {/* section5 */}
      {showLandingSection5 && (
        <LandingSection fullWidth maxWidth="1920px">
          <SpeakersContainer className="layout">
            <Stack direction="column">
              {landingSection5Title && (
                <LandingTitle title={landingSection5Title} textAlign="right" />
              )}
              <Stack direction="row" flexWrap="wrap">
                {keynoteSpeakers.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </Stack>
            </Stack>
          </SpeakersContainer>
        </LandingSection>
      )}
      {showLandingSection7 && landingSection7Sponsors && (
        <LandingSection fullWidth maxWidth="1920px">
          <Stack className="layout">
            <LandingTitle title={landingSection7Title || "Sponsored By"} />
            <Stack
              flexWrap="wrap"
              alignItems="center"
              sx={{
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                },
              }}
            >
              {landingSection7Sponsors.map((sponsor) => (
                <a
                  className="hover-zoom"
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    pointerEvents: sponsor.url ? "inherit" : "none",
                    position: "relative",
                  }}
                >
                  <img
                    src={sponsor.img}
                    alt={sponsor.name}
                    style={{
                      maxHeight: sponsor.height ? sponsor.height : "80px",
                      width: "100%",
                    }}
                  />
                </a>
              ))}
            </Stack>
          </Stack>
        </LandingSection>
      )}

      {/* <CookieConsent
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#EDF4FC",
        }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          flex: "none",
          color: theme.palette.common.black,
        }}
        buttonText="ACCEPT"
        buttonClasses="hover-zoom"
        buttonStyle={{
          color: theme.palette.common.white,
          fontWeight: "500",
          background: theme.palette.primary.gradation,
          border: `2px solid ${theme.palette.common.white}`,
          borderRadius: "15px",
          padding: "2px 15px",
        }}
      >
        {cookieConsentText && <InnerHTML html={cookieConsentText} />}
        <a href="/" target="_blank" style={{ padding: 0, width: "20%" }}>
          {seePrivacyPolicyText || ""}
        </a>
      </CookieConsent> */}

      {/* <LiveChatWidget license="13874505" group="0" /> */}
    </>
  );
};

export default Landing;
