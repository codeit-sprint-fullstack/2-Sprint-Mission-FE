import "@/styles/globals.css";
import Container from "components/Container/Container";
import Header from "components/Header/Header";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
