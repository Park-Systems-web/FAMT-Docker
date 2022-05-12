import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Stack } from "@mui/material";
import Title from "components/Title/Title";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData, S3_URL } from "utils/GlobalData";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import LandingSection from "components/Section/LandingSection";
import ComingSoon from "components/ComingSoon/ComingSoon";
import useMenuStore from "store/MenuStore";
import { useAuthState } from "context/AuthContext";
import { editorRole } from "utils/Roles";
import { SpeakersContainer } from "./SpeakersStyles";

const Speakers = () => {
  const { currentMenu } = useMenuStore();
  const authState = useAuthState();
  const [speakersState, setSpeakersState] = useState<Speaker.speakerType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePageViews();
  useEffect(() => {
    const config = {
      params: {
        nation: pathname,
      },
    };
    const getSpeakers = async () => {
      setLoading(true);
      const speakers = await axios.get(
        `${process.env.API_URL}/api/page/common/speakers`,
        config,
      );
      setSpeakersState(speakers.data);
      setLoading(false);
    };
    getSpeakers();
  }, []);

  const { speakers } = globalData.get(pathname) as Common.globalDataType;
  const { speakerBannerURL } = globalData.get(
    "common",
  ) as Common.globalDataType;
  useSeoTitle(speakers as string);

  if (loading) {
    return <Loading />;
  }

  return (
    <SpeakersContainer className="body-fit">
      {/* <Title fontSize={30} title={speakers || "Speakers"} /> */}
      <LandingSection
        className="banner"
        background={speakerBannerURL}
        maxWidth="1920px"
        fullWidth
      />
      <Box sx={{ flexGrow: 1 }} className="layout">
        {currentMenu &&
          currentMenu.is_published === 0 &&
          !editorRole.includes(authState.role) && <ComingSoon />}
        {(currentMenu && currentMenu.is_published === 1) ||
          (editorRole.includes(authState.role) && (
            <Grid
              container
              spacing={{ xs: 4, md: 7 }}
              columns={{ xs: 1, sm: 8, md: 16 }}
            >
              {speakersState.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </Grid>
          ))}
      </Box>
    </SpeakersContainer>
  );
};

export default Speakers;
