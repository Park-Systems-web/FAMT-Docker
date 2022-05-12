import styled from "styled-components";

export const YoutubeEmbedContainer = styled.div`
  .video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
  }

  .video-responsive iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  @media (max-width: 900px) {
    .video-responsive iframe {
      height: 80%;
      width: 80%;
    }
  }
`;
