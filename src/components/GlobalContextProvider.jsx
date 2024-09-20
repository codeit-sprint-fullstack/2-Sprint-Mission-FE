import { ErrorProvider } from "../contexts/ErrorContext.jsx";
import { PendingProvider } from "../contexts/PendingContext.jsx";
import { ViewportProvider } from "../contexts/ViewportContext.jsx";

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
