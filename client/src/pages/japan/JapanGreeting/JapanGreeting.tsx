import React from "react";
import Title from "components/Title/Title";
import { Button } from "@mui/material";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import JapanGreetingComponent from "pages/japan/JapanComponent/JapanGreetingComponent";
import { JapanGreetingContainer } from "./JapanGreetingStyles";

const JapanGreeting = () => {
  return (
    <JapanGreetingContainer>
      <JapanGreetingComponent />
      <br />

      <div className="video-container">
        <Title
          title="ナノ科学シンポジウム2020 Review & Interview"
          fontSize={24}
        />

        <YoutubeEmbed embedId="pEqU5l3n9dI" width="853" height="480" />

        <div className="button-container">
          <Button variant="contained">
            ナノ科学シンポジウム2022の参加登録はこちらから
          </Button>
        </div>
      </div>
    </JapanGreetingContainer>
  );
};

export default JapanGreeting;
