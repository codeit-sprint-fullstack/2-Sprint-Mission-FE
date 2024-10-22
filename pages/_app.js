import "@/styles/reset.css";
import "@/styles/globals.css";
import Nav from "@/conponents/Nav";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>판다마켓</Head>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}
