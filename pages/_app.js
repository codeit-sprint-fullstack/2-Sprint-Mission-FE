import Footer from '@/components/Footer';
import GNB from '@/components/GNB';
import "@/styles/globals.css";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
	<>
		<Head>
			<title>판다마켓</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<GNB />
		<Component {...pageProps} />
		<Footer />
	</>
	)
}
