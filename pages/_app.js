import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import GlobalContextProvider from '@/src/components/GlobalContextProvider';
import GlobalLayout from '@/src/layouts/GlobalLayout';
import '@/styles/import.css';

const clientSideEmotionCache = createCache({ key: 'css' });

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <GlobalContextProvider>
        <GlobalLayout>
          <Component {...pageProps} />
        </GlobalLayout>
      </GlobalContextProvider>
    </CacheProvider>
  );
}
