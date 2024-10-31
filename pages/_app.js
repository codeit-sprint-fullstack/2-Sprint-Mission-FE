import "@/styles/variables.css";
import "@/styles/globals.css";
import Head from "next/head";
import Nav from "@/components/Nav/Nav";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";
import "@/styles/HomePage.css";

export default function App({ Component, pageProps, router }) {
  const noLayoutPaths = ['/signin', '/signup'];

  if(noLayoutPaths.includes(router.pathname)) {
    return (
      <>
        <Head>
          <title>판다마켓</title>
        </Head>
        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }

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
