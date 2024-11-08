/** @jsxImportSource @emotion/react */
import createCache from '@emotion/cache';
import { CacheProvider, css } from '@emotion/react';
import dynamic from 'next/dynamic';
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
  return (
    <CacheProvider value={emotionCache}>
      <ViewportProviderWithNoSSR>
        <ErrorProvider>
          <PendingProvider>
            <AuthProvider>{children}</AuthProvider>
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
      </GlobalLayout>
    </GlobalContextProvider>
  );
}
