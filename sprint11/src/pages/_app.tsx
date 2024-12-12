import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from "@/context/UserProvider";
import ViewportProvider from "@/context/ViewportProvider";
import "@/styles/globals.css";
import { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ViewportProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ViewportProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}
