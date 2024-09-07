import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

function ErrorProvider({ defaultError = null, children }) {
  const [error, setError] = useState(defaultError);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

function useError() {
  const context = useContext(ErrorContext);
  if (!context) throw new Error(`Don't use useError() out of ErrorProvider`);

  return context.error;
}

function useSetError() {
  const context = useContext(ErrorContext);
  if (!context) throw new Error(`Don't use useSetError() out of ErrorProvider`);

  return context.setError;
}

export { ErrorProvider, useError, useSetError };
