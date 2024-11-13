import dynamic from 'next/dynamic';
import { ErrorProvider } from '../contexts/ErrorContext.jsx';
import { PendingProvider } from '../contexts/PendingContext.jsx';

const ViewportProviderWithNoSSR = dynamic(() => import('../contexts/ViewportContext.jsx'), { ssr: false });

export default function GlobalContextProvider({ children }) {
  return (
    <ViewportProviderWithNoSSR>
      <ErrorProvider>
        <PendingProvider>{children}</PendingProvider>
      </ErrorProvider>
    </ViewportProviderWithNoSSR>
  );
}
