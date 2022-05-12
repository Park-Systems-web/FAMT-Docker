import React, { useEffect } from "react";

import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import useSeoTitle from "hooks/useSeoTitle";

import { globalData } from "utils/GlobalData";

// 일본은 모달에 일본어가 나타나져야하기때문에 따로 불러옵니다. 다른국가는 Common 에서 불러옵니다.
const JapanExhibitParkSystems = () => {
  const pathname = usePageViews();
  const { exhibitHall } = globalData.get(pathname) as Common.globalDataType;

  useSeoTitle(exhibitHall as string);

  const [HTML, loading] = useHTML(
    `${process.env.API_URL}/api/page/jp/exhibit/parksystems`,
  );
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default JapanExhibitParkSystems;
