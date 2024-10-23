import Header from "../components/Header";
import Footer from "../components/Footer";
import { Noto_Sans, Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`${notoSans.className} ${notoSansKR.className}`}>
        <Header />
        <Footer />
      </main>
    </>
  );
}
