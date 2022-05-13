import { useLocation } from "react-router";

const usePageViews = () => {
  // const { pathname } = useLocation();

  // const firstPath = pathname.split("/")[1];
  // let result = "";
  // switch (firstPath) {
  //   case "kr": {
  //     result = firstPath;
  //     break;
  //   }
  //   case "americas": {
  //     result = firstPath;
  //     break;
  //   }
  //   case "jp": {
  //     result = firstPath;
  //     break;
  //   }
  //   case "eu": {
  //     result = firstPath;
  //     break;
  //   }
  //   case "asia": {
  //     result = firstPath;
  //     break;
  //   }
  //   case "": {
  //     result = "home";
  //     break;
  //   }
  //   default: {
  //     result = "";
  //   }
  // }
  // // 두번째 슬래시 나오는곳까지 자릅니다
  // return result;
  // 두번째 슬래시가 없다면 그냥 그자체로 반환 두번째 슬래시가 있다는것은 그 앞에만 잘라서 건네줘야함
  // return secondSlash === -1 ? pathname : pathname.substring(0, secondSlash);
  return "famt";
};

export default usePageViews;
