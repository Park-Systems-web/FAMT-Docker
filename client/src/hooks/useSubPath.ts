import { useLocation } from "react-router";

const useSubPath = () => {
  const { pathname } = useLocation();
  return ["", ...pathname.split("/").slice(2)].join("/");
};

export default useSubPath;
