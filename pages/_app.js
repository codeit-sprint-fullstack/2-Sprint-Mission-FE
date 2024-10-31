import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/globals.css';
import Head from 'next/head';
import GNB from '@/components/GNB/GNB';
import Footer from '@/components/Footer/Footer';
import Container from '@/components/Container';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isLoginPage = router.pathname === '/signin';
  const isSingupPage = router.pathname === '/signup';

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={pretendard.className}>
        {!isLoginPage && !isSingupPage && <GNB />}
        <Container>
          <Component {...pageProps} />
        </Container>
        {!isLoginPage && !isSingupPage && <Footer />}
      </div>
    </QueryClientProvider>
  );
}
