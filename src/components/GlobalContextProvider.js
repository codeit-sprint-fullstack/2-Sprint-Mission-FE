import { ErrorProvider } from '../contexts/ErrorContext';
import { PendingProvider } from '../contexts/PendingContext';
import { ViewportProvider } from '../contexts/ViewportContext';

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
