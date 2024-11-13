import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export default function ErrorProvider({ defaultError = null, children }) {
  const [error, setError] = useState(defaultError);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) throw new Error(`Don't use useError() out of ErrorProvider`);

  return context.error;
}

export function useSetError() {
  const context = useContext(ErrorContext);
  if (!context) throw new Error(`Don't use useSetError() out of ErrorProvider`);

  return context.setError;
}
