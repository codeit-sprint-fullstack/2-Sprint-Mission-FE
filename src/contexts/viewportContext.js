import { createContext, useContext, useEffect, useState } from 'react';

const breakpoints = Object.freeze({
  mobile: 743,
  tablet: 1199
});

const viewportContext = createContext();

export function ViewportProvider({ children }) {
  const getViewport = () => {
    if (window.innerWidth <= breakpoints.mobile) {
      return "mobile";
    } else if (window.innerWidth <= breakpoints.tablet) {
      return "tablet";
    } else {
      return "desktop";
    }
  }
  
  const [viewport, setViewport] = useState(getViewport);

  useEffect(() => {
    const handleResize = () => setViewport(getViewport);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <viewportContext.Provider value={viewport}>
      {children}
    </viewportContext.Provider>
  )
}

export function useViewport() {
  const viewport = useContext(viewportContext);
  
  if (!viewport) {
    throw new Error("Viewport Error!");
  }

  return viewport;
}