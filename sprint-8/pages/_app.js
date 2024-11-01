import Footer from "@/components/Footer.jsx";
import Header from "@/components/Header.jsx";
import ViewportProvider from "@/context/ViewportProvider.jsx";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ViewportProvider defValue="phone">
      <Head>
        <title>판다 마켓</title>
        <link rel="icon" href="/images/판다-얼굴.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ViewportProvider>
  );
}
