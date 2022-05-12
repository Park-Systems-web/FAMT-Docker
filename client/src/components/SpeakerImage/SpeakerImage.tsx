import { Box } from "@mui/system";
import React from "react";
import { S3_URL } from "utils/GlobalData";
import { SpeakerImageContainer } from "./SpeakerImageStyles";

interface speakerImageProps extends React.ComponentPropsWithoutRef<"div"> {
  src: string;
  alt: string;
}

const SpeakerImage = (props: speakerImageProps) => {
  const { src, alt, ...rest } = props;
  return (
    <SpeakerImageContainer {...rest}>
      <img className="speaker-image" src={`${S3_URL}/${src}`} alt={alt} />
      <div className="overlay" />
    </SpeakerImageContainer>
  );
};

export default SpeakerImage;
