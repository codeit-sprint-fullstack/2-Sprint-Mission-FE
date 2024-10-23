import "./global.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Container from "../components/Container.jsx";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
