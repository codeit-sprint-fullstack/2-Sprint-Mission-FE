import "./global.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Container from "../components/Container.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </>
    </QueryClientProvider>
  );
}
