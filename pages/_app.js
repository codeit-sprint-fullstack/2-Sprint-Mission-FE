import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { useState } from "react";
import AuthProvider from "@/contexts/AuthProvider";
import ErrorProvider from "@/contexts/ErrorProvider";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ErrorProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Head></Head>
          <Nav />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Footer />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}
