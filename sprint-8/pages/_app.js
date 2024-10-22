import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ViewportProvider from "@/context/ViewportProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ViewportProvider defValue="phone">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ViewportProvider>
  );
}
