import { ErrorProvider } from '../contexts/ErrorContext.js';
import { PendingProvider } from '../contexts/PendingContext.js';
import { ViewportProvider } from '../contexts/ViewportContext.js';

function GlobalContextProvider({ children }) {
  return (
    <ViewportProvider>
      <ErrorProvider>
        <PendingProvider>{children}</PendingProvider>
      </ErrorProvider>
    </ViewportProvider>
  );
}

export default GlobalContextProvider;
