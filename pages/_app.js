import "@/styles/variables.css";
import "@/styles/globals.css";
import Head from "next/head";
import Nav from "@/components/Nav/Nav";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";
import "@/styles/HomePage.css";
import { AuthProvider } from "@/contexts/AuthProvider";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutPaths = ['/signin', '/signup'];

  return (
    <AuthProvider>
      <Head>
        <title>판다마켓</title>
      </Head>
      {noLayoutPaths.includes(router.pathname) ? (
        <Container>
          <Component {...pageProps} />
        </Container>
      ) : (
        <>
          <Nav />
          <Container>
            <Component {...pageProps} />
          </Container>
          <Footer />
        </>
      )}
    </AuthProvider>
  );
}