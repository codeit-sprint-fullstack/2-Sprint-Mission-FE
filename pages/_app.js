import "@/styles/variables.css";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
  <>
    <Head>
      <title>판다마켓</title>
    </Head>
    <Component {...pageProps} />
  </>
  )
}
