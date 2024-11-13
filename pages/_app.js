/** @jsxImportSource @emotion/react */
import createCache from '@emotion/cache';
import { CacheProvider, css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';
import React from 'react';
import Footer from '@components/Footer';
import GNB from '@components/GNB';
import Modal from '@components/Modal';
import AuthProvider from '@contexts/AuthProvider';
import ErrorProvider, { useError } from '@contexts/ErrorProvider';
import PendingProvider, { useIsLoading } from '@contexts/PendingProvider';
import '@/styles/import.css';

const clientSideEmotionCache = createCache({ key: 'css' });
const ViewportProviderWithNoSSR = dynamic(() => import('@contexts/ViewportProvider.jsx'), { ssr: false });

const style = {
  message: css`
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
  `,
};

function GlobalLayout({ children }) {
  const isLoading = useIsLoading();
  const err = useError();

  return (
    <>
      <GNB />
      <main>{children}</main>
      <Footer />
      {/* {isLoading && <Modal message="로딩 중입니다." noButton />} */}
      {isLoading && (
        <Modal>
          <p css={style.message}>로딩 중입니다.</p>
        </Modal>
      )}
      {err && (
        <Modal buttons={['확인']}>
          <p css={style.message}>{err.response?.data?.message || err.message}</p>
        </Modal>
      )}
    </>
  );
}

function GlobalContextProvider({ children, emotionCache = clientSideEmotionCache }) {
  // NOTE SSR 환경에서 클라이언트가 바로 refetch하지 않도록, staletime을 세팅한다.
  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } }));
  return (
    <CacheProvider value={emotionCache}>
      <ViewportProviderWithNoSSR>
        <ErrorProvider>
          <PendingProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          </PendingProvider>
        </ErrorProvider>
      </ViewportProviderWithNoSSR>
    </CacheProvider>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <GlobalLayout>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </GlobalLayout>
    </GlobalContextProvider>
  );
}
