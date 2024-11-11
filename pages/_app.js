import "@/styles/globals.css";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthProvider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noHeaderFooter = router.pathname === "/login" || router.pathname === "/signup";
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Head>
          <title>판다마켓</title>
          <meta name="description" content="일상에서 모든 물건을 거래해보세요" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {!noHeaderFooter && <Header />}
        <main>
          <Component {...pageProps} />
        </main>
        {!noHeaderFooter && <Footer />}
      </AuthProvider>
    </QueryClientProvider>
  );
}
