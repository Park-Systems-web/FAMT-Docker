import React from "react";
import ProgramsList from "components/Programs/ProgramsList";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "utils/GlobalData";

const Programs = () => {
  const pathname = usePageViews();
  const { programs } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(programs as string);
  return <ProgramsList />;
};

export default Programs;
