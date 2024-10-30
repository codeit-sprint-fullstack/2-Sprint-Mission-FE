import Head from 'next/head';
import '@/src/styles/reset.css';
import '@/src/styles/globals.css';
import '@/src/styles/color.css';
import Nav from '@/src/components/Nav.js';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={pretendard.className}>
        <Nav />
        <Component {...pageProps} />
      </main>
    </>
  );
}
