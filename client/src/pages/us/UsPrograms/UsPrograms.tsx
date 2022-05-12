import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";

const UsPrograms = () => {
  const [HTML, loading] = useHTML(
    `${process.env.API_URL}/api/page/common/maintenance`,
  );
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default UsPrograms;
