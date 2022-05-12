/* eslint-disable react/require-default-props */
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface linkProps extends React.ComponentPropsWithoutRef<"a"> {
  to: string;
  children: string | JSX.Element;
}

const LinkWithSearch = (props: linkProps) => {
  const { to, children, ...rest } = props;
  const { search } = useLocation();
  return (
    <Link to={to + search} {...rest}>
      {children}
    </Link>
  );
};

export default LinkWithSearch;
