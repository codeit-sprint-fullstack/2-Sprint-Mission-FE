import { createContext, useContext, useState } from 'react';

const PendingContext = createContext();

function PendingProvider({ defaultPending = false, children }) {
  const [pending, setPending] = useState(defaultPending);

  return (
    <PendingContext.Provider value={{ pending, setPending }}>
      {children}
    </PendingContext.Provider>
  );
}

function usePending() {
  const context = useContext(PendingContext);
  if (!context)
    throw new Error(`Don't use usePending() out of PendingProvider`);

  return context.pending;
}

function useSetPending() {
  const context = useContext(PendingContext);
  if (!context)
    throw new Error(`Don't use useSetPending() out of PendingProvider`);

  return context.setPending;
}

export { PendingProvider, usePending, useSetPending };
