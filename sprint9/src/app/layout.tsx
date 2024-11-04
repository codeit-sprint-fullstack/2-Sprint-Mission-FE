import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Nav from "../components/Nav";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920"
});

export const metadata: Metadata = {
  title: "판다마켓",
  description: "판다 마켓에 어서오세요"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Nav />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
