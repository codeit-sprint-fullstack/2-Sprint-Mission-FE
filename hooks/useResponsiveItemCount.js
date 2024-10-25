import { useState, useEffect } from "react";
export default function useResponsiveItemCount({ lg, md, sm }) {
  const [count, setCount] = useState();
  const PC_WIDTH = 1200;
  const TABLET_WIDTH = 744;
  const getSize = (width) => {
    if (width > PC_WIDTH) return lg;
    if (width > TABLET_WIDTH) return md;
    return sm;
  };
  useEffect(() => {
    setCount(getSize(window.innerWidth));
    const onResize = () => {
      setCount(getSize(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return { count };
}
