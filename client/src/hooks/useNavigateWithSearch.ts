import {
  useNavigate as useNavigateOriginal,
  useLocation,
} from "react-router-dom";

export const useNavigate = () => {
  const navigate = useNavigateOriginal();
  const { search } = useLocation();

  const newNavigate = (to: string | number) => {
    if (typeof to === "string") {
      navigate(to + search);
    } else {
      navigate(to);
    }
  };

  return newNavigate;
};
