import { useState, useEffect } from "react";
export default function useResponsiveItemC1ount({ sm, md, lg }) {
  const [pageSize, setPageSize] = useState();
  const PC_WIDTH = 1200;
  const TABLET_WIDTH = 744;
  const getSize = (width) => {
    if (width > PC_WIDTH) return lg;
    if (width > TABLET_WIDTH) return md;
    return sm;
  };
  useEffect(() => {
    setPageSize(getSize(window.innerWidth));
    const onResize = () => {
      setPageSize(getSize(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return { pageSize };
}
