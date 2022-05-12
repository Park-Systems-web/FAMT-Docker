import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { TimerContainer } from "./TimerStyles";

interface TimerProps {
  second: number;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ second, setIsExpired }: TimerProps) => {
  const [timeRemained, setTimeRemained] = useState<number>(second);
  const minuteRemained = Math.floor(timeRemained / 60);
  const secondRemained = Math.floor(timeRemained % 60);
  const [intervalState, setIntervalState] = useState<NodeJS.Timer>();

  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    setIntervalState(
      setInterval(() => {
        setTimeRemained((timeRemained) => timeRemained - 1);
      }, 1000),
    );
  }, []);

  const oneTick = Math.floor((100 / second) * 100) / 100;
  useEffect(() => {
    if (intervalState && timeRemained < 1) {
      clearInterval(intervalState);
      setIsExpired(true);
    } else {
      // progress 계산
      const newProgress = progress - oneTick;
      setProgress(newProgress);
    }
  }, [timeRemained]);

  return (
    <TimerContainer>
      {timeRemained >= 0 && (
        <>
          <CircularProgress variant="determinate" value={progress} />
          <Box
            sx={{
              position: "absolute",
              width: "40px",
              height: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.primary.dark"
              fontWeight={700}
            >
              {minuteRemained}:
              {secondRemained < 10 ? `0${secondRemained}` : secondRemained}
            </Typography>
          </Box>
        </>
      )}
    </TimerContainer>
  );
};

export default Timer;
