/* eslint-disable react/require-default-props */
import React from "react";
import { LandingSectionContainer } from "./LandingSectionStyles";

interface LandingSectionProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: JSX.Element | JSX.Element[] | string | string[];
  maxWidth?: string;
  height?: string;
  fullWidth?: boolean;
  background?: string;
}
const LandingSection = (props: LandingSectionProps) => {
  const {
    children,
    maxWidth,
    fullWidth = false,
    height = "100%",
    background = null,
    ...rest
  } = props;

  return (
    <LandingSectionContainer
      {...rest}
      className={`${rest.className !== undefined ? ` ${rest.className}` : ""}${
        fullWidth ? " fullWidth" : ""
      }`}
      style={{
        ...rest.style,
        ...{
          display: "block",
          minHeight: height,
          maxWidth,
          backgroundImage: `${background ? `url(${background})` : "forError"}`,
          margin: "0 auto",
        },
      }}
    >
      {children}
    </LandingSectionContainer>
  );
};
export default LandingSection;
