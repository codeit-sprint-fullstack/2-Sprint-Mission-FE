import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다 마켓 - 자유게시판</title>
        <link rel="icon" href="/favicon.ico" />
       
        <style>{`
          html,
          body {
            font-family: Pretendard;
          }
        `}</style>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
