import React from "react";
import { Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
}));

interface SpeakerCardProps {
  speaker: Speaker.speakerType;
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

const JPSpeakerCard = ({
  speaker,
  isAdmin = false,
  onClick,
}: SpeakerCardProps) => {
  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      key={speaker.id}
      sx={{
        cursor: `${isAdmin ? "pointer" : "auto"}`,
        width: { tablet: "380px", mobile: "100%" },
      }}
      className="speaker-grid"
      onClick={onClick}
    >
      <Item className="speaker-card">
        {/* 같은 도메인의 백엔드 주소 가져오기 */}
        <img
          className="speaker-image"
          src={`https://nss-integration.s3.us-west-1.amazonaws.com/${speaker.image_path}`}
          alt="speakerImage"
        />
        <h3 style={{ fontSize: "1.5rem", marginTop: "5px" }} className="name">
          {speaker.name}
        </h3>
        <h5 className="belong">{speaker.belong}</h5>
        {speaker.description && (
          <h5 className="description">{speaker.description}</h5>
        )}
      </Item>
    </Grid>
  );
};

export default JPSpeakerCard;
