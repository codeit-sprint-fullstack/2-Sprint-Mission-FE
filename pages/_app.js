import '@/styles/globals.css';
import Head from 'next/head';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Container from '@/components/Container';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isLoginPage = router.pathname === '/login';
  const isSingupPage = router.pathname === '/signup';

  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={pretendard.className}>
        {!isLoginPage && !isSingupPage && <Nav />}
        <Container>
          <Component {...pageProps} />
        </Container>
        {!isLoginPage && !isSingupPage && <Footer />}
      </div>
    </>
  );
}
