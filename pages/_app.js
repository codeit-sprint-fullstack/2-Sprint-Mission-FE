import "@/styles/reset.css";
import "@/styles/globals.css";
import Nav from "@/conponents/Nav";
import Head from "next/head";
import Footer from "@/conponents/Footer";

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
