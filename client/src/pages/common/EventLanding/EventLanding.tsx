import { Box, Stack, Typography, useTheme } from "@mui/material";
import LandingNationCard from "components/Card/LandingNationCard";
import LandingSection from "components/Section/LandingSection";
import React from "react";
import { Link } from "react-router-dom";
import { globalData } from "utils/GlobalData";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import BackgroundVectorColored from "components/BackgroundVector/BackgroundVectorColored";
import { mainFontSize } from "utils/FontSize";
import InnerHTML from "dangerously-set-html-content";
import { EventLandingContainer } from "./EventLandingStyles";

const EventLanding = () => {
  const {
    eventLandingMainBannerURL,
    logoURL,
    fullLogoURL,
    eventLandingDesc,
    eventLandingBodyBackground,
    teaserVideoEmbed,
    teaserVideoURL,
    nations,
    bannerLogoURL,
    sponsor1LogoURL,
    sponsor2LogoURL,
  } = globalData.get("common") as Common.globalDataType;

  const theme = useTheme();
  return (
    <EventLandingContainer>
      <LandingSection
        className="banner-section"
        background={eventLandingMainBannerURL}
        fullWidth
      />
      <Box className="body-container">
        {teaserVideoEmbed && (
          <LandingSection fullWidth>
            <Stack className="layout" spacing={4} alignItems="center">
              {/* 영상, desc */}
              <Stack
                justifyContent="space-between"
                spacing={4}
                alignItems="center"
              >
                <Stack
                  sx={{
                    width: "100%",
                    flexDirection: {
                      laptop: "row",
                      mobile: "column",
                    },
                  }}
                  alignItems={{
                    mobile: "center",
                    laptop: "center",
                  }}
                  justifyContent="center"
                >
                  <img className="section-logo" src={logoURL} alt="logo" />
                  {teaserVideoURL && (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                      className="teaser-video"
                      src={teaserVideoURL}
                      height="250"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      controlsList="nodownload"
                    />
                  )}
                  {/* <YoutubeEmbed
                  embedId={teaserVideoEmbed}
                  width="400"
                  height="250"
                /> */}
                </Stack>
                <Typography
                  textAlign="left"
                  mt={1}
                  color={theme.palette.grey[600]}
                  sx={{
                    fontSize: mainFontSize,
                    width: {
                      laptop: "90%",
                    },
                  }}
                >
                  <InnerHTML html={eventLandingDesc || ""} />
                </Typography>
              </Stack>

              {/* 나라 카드 */}
              <Stack
                direction="row"
                width={{ laptop: "100%" }}
                flexWrap="wrap"
                justifyContent="center"
                sx={{
                  minWidth: "200px",
                }}
              >
                {nations &&
                  nations.map((nation) => {
                    if (nation.name === "NSS China") {
                      return (
                        <LandingNationCard
                          key={nation.name}
                          img={nation.img}
                          name={nation.name}
                          date={nation.date}
                          path={nation.path}
                          // disabled -> coming soon
                        />
                      );
                    }
                    return (
                      <LandingNationCard
                        key={nation.name}
                        img={nation.img}
                        name={nation.name}
                        date={nation.date}
                        path={`/${nation.path}`}
                        // disabled -> coming soon
                      />
                    );
                  })}
              </Stack>
              {/* 스폰서 */}
            </Stack>
            {/* Sponsor */}
          </LandingSection>
        )}
      </Box>
      <LandingSection fullWidth>
        <Stack
          justifyContent="center"
          sx={{
            flexDirection: {
              laptop: "row",
            },
            alignItems: {
              mobile: "center",
            },
          }}
        >
          <a
            href="https://nanoscientific.org"
            target="_blank"
            rel="noreferrer"
            // className="hover-zoom"
          >
            <img src={sponsor1LogoURL} alt="park logo" height="70" />
          </a>
          <a
            href="https://parksystems.com"
            target="_blank"
            rel="noreferrer"
            // className="hover-zoom"
          >
            <img src={sponsor2LogoURL} alt="park logo" height="70" />
          </a>
        </Stack>
      </LandingSection>
    </EventLandingContainer>
  );
};

export default EventLanding;
