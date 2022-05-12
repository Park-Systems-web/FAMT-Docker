import { useEffect } from "react";
import { globalData } from "utils/GlobalData";
import usePageViews from "./usePageViews";

const useSeoTitle = (title: string) => {
  const pathname = usePageViews();
  const { fullName } = globalData.get(pathname) as Common.globalDataType;
  useEffect(() => {
    document.title = title
      ? `${title.toUpperCase()} | ${fullName}`
      : `${fullName}`;
  }, []);
};

export default useSeoTitle;
