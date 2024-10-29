import '@/styles/globals.css';
import Head from 'next/head';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Container from '@/components/Container';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={pretendard.className}>
        <Nav />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </div>
    </>
  );
}
