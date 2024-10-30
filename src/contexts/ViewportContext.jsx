import { createContext, useContext, useEffect, useState } from 'react';
import c from '../utils/constants.js';

const ViewportContext = createContext();

export default function ViewportProvider({ children }) {
  const [viewport, setViewport] = useState(() => {
    const width = window.innerWidth;

    if (width <= c.BREAKPOINTS.MOBILE) return c.VIEWPORT.MOBILE;
    if (width <= c.BREAKPOINTS.TABLET) return c.VIEWPORT.TABLET;
    return c.VIEWPORT.PC;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= c.BREAKPOINTS.MOBILE) return setViewport(c.VIEWPORT.MOBILE);
      if (width <= c.BREAKPOINTS.TABLET) return setViewport(c.VIEWPORT.TABLET);
      return setViewport(c.VIEWPORT.PC);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <ViewportContext.Provider value={{ viewport }}>{children}</ViewportContext.Provider>;
}

export function useViewport() {
  const context = useContext(ViewportContext);
  if (!context) throw new Error(`Don't use useViewport() out of ViewportProvider`);

  return context.viewport;
}
