/* eslint-disable react/require-default-props */
import React from "react";

interface YoutubeEmbedProps {
  embedId: string;
  width?: string;
  height?: string;
}

const YoutubeEmbed = ({ embedId, width, height }: YoutubeEmbedProps) => {
  return (
    <div
      className="video-responsive"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        width={width || "100%"}
        height={height || "100%"}
        src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1&playsinline=1`}
        frameBorder="0"
        allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
