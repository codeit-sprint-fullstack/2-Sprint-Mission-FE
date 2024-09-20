import { createContext, useContext, useEffect, useState } from "react";

const VIEWPORT = Object.freeze({
  PC: "PC",
  TABLET: "TABLET",
  MOBILE: "MOBILE",
});
const BREAKPOINTS = Object.freeze({
  MOBILE: 743,
  TABLET: 1199,
});

const ViewportContext = createContext();

function ViewportProvider({ children }) {
  const [viewport, setViewport] = useState(() => {
    const width = window.innerWidth;

    if (width <= BREAKPOINTS.MOBILE) return VIEWPORT.MOBILE;
    if (width <= BREAKPOINTS.TABLET) return VIEWPORT.TABLET;
    return VIEWPORT.PC;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= BREAKPOINTS.MOBILE) return setViewport(VIEWPORT.MOBILE);
      if (width <= BREAKPOINTS.TABLET) return setViewport(VIEWPORT.TABLET);
      return setViewport(VIEWPORT.PC);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ viewport }}>
      {children}
    </ViewportContext.Provider>
  );
}

function useViewport() {
  const context = useContext(ViewportContext);
  if (!context)
    throw new Error(`Don't use useViewport() out of ViewportProvider`);

  return context.viewport;
}

export { VIEWPORT, ViewportProvider, useViewport };
