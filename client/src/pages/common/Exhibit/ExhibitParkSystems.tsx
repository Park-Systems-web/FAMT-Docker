import React, { useEffect } from "react";

import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";

const ExhibitParkSystems = () => {
  const [HTML, loading] = useHTML(
    `${process.env.API_URL}/api/page/common/exhibit/parksystems`,
  );
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default ExhibitParkSystems;
