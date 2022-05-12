import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";

const ExhibitNanoScientific = () => {
  const [HTML, loading] = useHTML(
    `${process.env.API_URL}/api/page/common/exhibit/nanoscientific`,
  );
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default ExhibitNanoScientific;
