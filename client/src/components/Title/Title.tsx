import React from "react";
import { TitleContainer } from "./TitleStyles";

interface TitleProps {
  title: string;
  fontSize: number;
}

const Title = ({ title, fontSize }: TitleProps) => {
  return (
    <TitleContainer fontSize={fontSize}>
      <h1>{title}</h1>
    </TitleContainer>
  );
};

export default Title;
