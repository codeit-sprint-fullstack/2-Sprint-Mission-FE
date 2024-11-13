import '@/styles/variable.css';
import '@/styles/globals.css';
import Nav from '@/components/Common/Nav';
import Footer from '@/components/Common/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { UserProvider } from '@/contexts/UserContext';

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0
          }
        }
      })
  );
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <>
        <Nav />
        {page}
        <Footer />
      </>
    ));
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
    </QueryClientProvider>
  );
}
