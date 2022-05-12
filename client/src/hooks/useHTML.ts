import { useEffect, useState } from "react";
import axios from "axios";
import usePageViews from "./usePageViews";

const useHTML = (url: string): [string, boolean] => {
  const [HTML, setHTML] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePageViews();

  const config = {
    params: {
      nation: pathname,
    },
  };

  useEffect(() => {
    const getHTML = async () => {
      setLoading(true);
      const HTML = await axios.get(url,config);
      setHTML(HTML.data);
      setLoading(false);
    };
    getHTML();
  }, []);

  return [HTML, loading];
};
export default useHTML;
