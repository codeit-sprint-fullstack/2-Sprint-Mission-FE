import Footer from '@/components/Footer';
import GNB from '@/components/GNB';
import '@/styles/globals.css';
import Head from 'next/head';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { AuthProvider } from '@/lib/authContext';
import { ViewportProvider } from '@/lib/viewportContext';

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ViewportProvider>
          <AuthProvider>
            <Head>
              <title>판다마켓</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <GNB />
            <Component {...pageProps} />
            <Footer />
          </AuthProvider>
        </ViewportProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
