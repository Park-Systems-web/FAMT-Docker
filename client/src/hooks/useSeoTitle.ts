import { useEffect } from "react";
import { globalData } from "utils/GlobalData";
import usePageViews from "./usePageViews";

const useSeoTitle = (currentMenu: Common.menuType) => {
  const pathname = usePageViews();
  const fullName = pathname ? "FAMT 2022" : globalData.get(pathname).fullName;

  useEffect(() => {
    document.title = currentMenu
      ? `${currentMenu.name.toUpperCase()} | ${fullName}`
      : fullName;
  }, [currentMenu]);
};

export default useSeoTitle;
