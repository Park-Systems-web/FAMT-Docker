import React from "react";
import useHTML from "hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";

const Sponsors = () => {
  const pathname = usePageViews();

  const config = {
    params: {
      nation: pathname,
    },
  };
  const [HTML, loading] = useHTML(
    `${process.env.API_URL}/api/page/common/sponsors`,
  );
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default Sponsors;
