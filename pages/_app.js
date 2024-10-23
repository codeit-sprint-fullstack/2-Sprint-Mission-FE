import "@/styles/variables.css";
import "@/styles/globals.css";
import Head from "next/head";
import Nav from "@/components/Nav/Nav";
import Container from "@/components/Container";
import Footer from "@/components/Footer/Footer";

export default function App({ Component, pageProps }) {
  return (
  <>
    <Head>
      <title>판다마켓</title>
    </Head>
    <Nav />
    <Container>
      <Component {...pageProps} />
    </Container>
    <Footer />
  </>
  )
}
