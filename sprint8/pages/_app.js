import Head from 'next/head';
import '@/styles/reset.css';
import '@/styles/globals.css';
import '@/styles/color.css';
import Nav from '@/components/Nav.js';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}
