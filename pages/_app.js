import "@/styles/globals.css";
import Head from "next/head";
import Nav from "@/components/Nav";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}
