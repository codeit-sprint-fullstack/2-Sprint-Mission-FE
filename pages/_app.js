import '@/styles/globals.css';
import Head from 'next/head';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
