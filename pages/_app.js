import "@/styles/variables.css";
import "@/styles/globals.css";
import Head from "next/head";
import Nav from "@/components/Nav/Nav";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";
import "@/styles/HomePage.css";
import { AuthProvider } from "@/contexts/AuthProvider";

export default function App({ Component, pageProps, router }) {
  const noLayoutPaths = ['/signin', '/signup'];

  if(noLayoutPaths.includes(router.pathname)) {
    return (
      <>
      <AuthProvider>
        <Head>
          <title>판다마켓</title>
        </Head>
        <Container>
          <Component {...pageProps} />
        </Container>
      </AuthProvider>
      </>
    );
  }

  return (
  <>
    <AuthProvider>
      <Head>
        <title>판다마켓</title>
      </Head>
      <Nav />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </AuthProvider>
  </>
  )
}
