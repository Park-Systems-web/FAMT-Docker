import { useTheme } from "@mui/material";
import styled from "styled-components";

export const JapanArchiveContainer = styled.div`
  .banner {
    object-fit: contain;
    width: 100%;
  }

  .content {
    display: flex;
    margin-bottom: 40px;
    border-bottom: 3px solid #fff;

    .string-content {
      width: 40%;
      display: flex;
      flex-direction: column;
      padding: 30px;
      align-items: center;
      justify-content: space-evenly;

      h1 {
        font-size: 2.4rem;
      }
      h2 {
        font-size: 1.6rem;
        margin-bottom: 0px;
      }
      .navy {
        color: ${() => {
          const theme = useTheme();
          return theme.palette.primary.heading;
        }};
      }
      span {
        font-weight: bold;
      }
      button {
        min-width: 300px;
      }
    }

    .video-content {
      width: 60%;
    }
  }

  .greeting {
    border-bottom: 3px solid #fff;
    margin-bottom: 30px;
  }

  .speakers {
    border-bottom: 3px solid #fff;
    .belong {
      white-space: pre-line;
    }
    .description {
      white-space: pre-line;
    }
  }

  .exhibition {
    background-color: #56bbe2;
    display: flex;
    img {
      width: 50%;
    }

    .string-section {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      h1 {
        font-size: 3.5rem;
        color: white;
      }

      h5 {
        font-size: 1rem;
        font-weight: bold;
        color: white;
      }
    }
  }

  .last-year {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .video-responsive {
      width: 50%;
    }

    button {
      min-width: 350px;
      margin: 30px 0px;
    }
  }
  @media (min-width: 900px) {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1 {
      min-height: 450px;
    }
  }
  @media (min-width: 1300px) {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1 {
      min-height: 500px;
    }
  }
  @media (min-width: 1650px) {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1 {
      min-height: 530px;
    }
  }

  @media (min-width: 1850px) {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1 {
      min-height: 610px;
    }
  }

  @media (max-width: 1000px) {
    .last-year {
      .video-responsive {
        width: 90%;
      }
    }
  }

  @media (max-width: 480px) {
    button {
      width: 100%;
    }
  }

  @media (max-width: 875px) {
    .content {
      width: 100%;
      flex-direction: column;
      align-items: center;
      .string-content {
        margin-top: 20px;
        width: 100%;
        padding: 10px;
        h1 {
          font-size: 1.5rem;
        }
        button {
          margin: 10px 0;
        }
      }

      .video-content {
        width: 90%;
        margin-top: 20px;
        border-radius: 10px;
      }
    }

    .exhibition {
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
        margin: 0 auto;
      }

      .string-section {
        text-align: center;
      }
    }

    .last-year {
      padding: 10px;
    }
  }
`;
