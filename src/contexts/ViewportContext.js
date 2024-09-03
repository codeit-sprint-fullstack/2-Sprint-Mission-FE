import { createContext, useContext, useState } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

const VIEWPORT = Object.freeze({
  PC: 'PC',
  TABLET: 'TABLET',
  MOBILE: 'MOBILE'
});

const ViewportContext = createContext();

function ViewportProvider({ defaultViewport = VIEWPORT.PC, children }) {
  const [viewport, setViewport] = useState(defaultViewport);

  return (
    <ViewportContext.Provider value={{ viewport, setViewport }}>
      {children}
    </ViewportContext.Provider>
  );
}

function useViewport() {
  const context = useContext(ViewportContext);
  if (!context)
    throw new Error(`Don't use useViewport() out of ViewportProvider`);

  const { width } = useWindowDimensions();

  if (width >= 1200) context.setViewport(VIEWPORT.PC);
  else if (width >= 744) context.setViewport(VIEWPORT.TABLET);
  else context.setViewport(VIEWPORT.MOBILE);

  return context.viewport;
}

export { VIEWPORT, ViewportProvider, useViewport };
