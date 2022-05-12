import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Link from "components/Link/LinkWithSearch";
import usePageViews from "hooks/usePageViews";
import useSubPath from "hooks/useSubPath";
import { Typography, useTheme } from "@mui/material";
import { mainFontSize } from "utils/FontSize";
import { MenuLinkContainer } from "./MenuLinkStyles";

interface MenuLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  to: string;
  children: JSX.Element | JSX.Element[] | string | string[];
  // eslint-disable-next-line react/require-default-props
  // published?: boolean;
}
const MenuLink = (props: MenuLinkProps) => {
  const { to, children, ...rest } = props;
  const [active, setActive] = useState<string>("");
  const pathname = usePageViews();
  const subpath = useSubPath();

  const theme = useTheme();

  useEffect(() => {
    if (to === `/${pathname + subpath}`) {
      setActive("active");
    } else {
      setActive("");
    }
  }, [pathname, subpath]);
  return (
    <MenuLinkContainer
    // className={!published ? "disabled" : ""}
    >
      <Link to={to} {...rest} className={active}>
        <Typography
          fontWeight={theme.typography.fontWeightBold}
          fontSize={mainFontSize}
        >
          {children}
        </Typography>
      </Link>
    </MenuLinkContainer>
  );
};
export default MenuLink;
