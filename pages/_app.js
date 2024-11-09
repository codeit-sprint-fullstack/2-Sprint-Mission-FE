import Head from "next/head";
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import Nav from "@/components/Nav/Nav";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthProvider";

import "@/styles/variables.css";
import "@/styles/globals.css";
import "@/styles/HomePage.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutPaths = ['/signin', '/signup'];

  // QueryClient를 상태로 관리하여 캐시가 재사용되도록 설정
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,     // 1분 동안 데이터가 유효하도록 설정
          cacheTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
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
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </AuthProvider>
    </QueryClientProvider>
  );
}
