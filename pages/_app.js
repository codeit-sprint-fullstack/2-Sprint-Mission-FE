import Head from "next/head";
import Header from "@/components/Header/Header";
import Footer from "../components/Footer/Footer";
import "@/styles/global.css";
import Container from "@/components/Container/Container";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
