import { createContext, useContext, useState, useEffect } from 'react';

const PendingContext = createContext();

function PendingProvider({ defaultPending = false, children }) {
  const [pending, setPending] = useState(defaultPending);
  const [isLoading, setIsLoading] = useState(false);

  // 시간 경과 체크를 위한 useEffect
  useEffect(() => {
    if (!pending) return setIsLoading(false);
    const tick = setTimeout(() => {
      setIsLoading(true);
    }, 2000);

    return () => clearTimeout(tick);
  }, [pending]);

  return (
    <PendingContext.Provider value={{ setPending, isLoading }}>
      {children}
    </PendingContext.Provider>
  );
}

function useIsLoading() {
  const context = useContext(PendingContext);
  if (!context)
    throw new Error(`Don't use useIsLoading() out of PendingProvider`);

  return context.isLoading;
}

function useSetPending() {
  const context = useContext(PendingContext);
  if (!context)
    throw new Error(`Don't use useSetPending() out of PendingProvider`);

  return context.setPending;
}

export { PendingProvider, useIsLoading, useSetPending };
