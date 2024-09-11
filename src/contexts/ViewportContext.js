import { createContext, useContext, useEffect, useState } from 'react';

const VIEWPORT = Object.freeze({
  PC: 'PC',
  TABLET: 'TABLET',
  MOBILE: 'MOBILE'
});

const ViewportContext = createContext();

function ViewportProvider({ defaultViewport = VIEWPORT.PC, children }) {
  const [viewport, setViewport] = useState(defaultViewport);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1200) setViewport(VIEWPORT.PC);
      else if (width >= 744) setViewport(VIEWPORT.TABLET);
      else setViewport(VIEWPORT.MOBILE);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
