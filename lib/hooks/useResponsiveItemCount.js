import { useState, useEffect } from "react";
export default function useResponsiveItemCount({ sm, md, lg }) {
  const [pageSize, setPageSize] = useState();
  const PC_WIDTH = 1200;
  const TABLET_WIDTH = 744;
  const getSize = (width) => {
    if (width > PC_WIDTH) return lg;
    if (width > TABLET_WIDTH) return md;
    return sm;
  };
  useEffect(() => {
    //setPageSize(getSize(window.innerWidth));
    const onResize = () => {
      setPageSize(getSize(window.innerWidth));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return pageSize;
}
