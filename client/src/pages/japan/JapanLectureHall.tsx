import React from "react";
import { VideoContainer } from "components/VideoContainer/VideoContainer";

const JapanLectureHall = () => {
  return (
    <VideoContainer>
      <video
        src="https://d25unujvh7ui3r.cloudfront.net/lecture_hall.mp4"
        muted
        autoPlay
        loop
        playsInline
      />
    </VideoContainer>
  );
};

export default JapanLectureHall;
