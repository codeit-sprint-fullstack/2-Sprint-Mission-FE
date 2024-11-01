import "./global.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Container from "../components/Container.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthProvider";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <Header />
          <Container>
            <Component {...pageProps} />
          </Container>
          <Footer />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}
