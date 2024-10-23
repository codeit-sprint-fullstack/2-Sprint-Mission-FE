import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname;

  const [imageSrc, setImageSrc] = useState("/logoImg.png");
  const [imageWidth, setImageWidth] = useState(153);
  const [imageHeight, setImageHeight] = useState(51);

  useEffect(() => {
    const windowResize = () => {
      if (window.innerWidth <= 743 && window.innerWidth >= 375) {
        setImageSrc("/smallLogoImg.png");
        setImageWidth(81);
        setImageHeight(27);
      } else {
        setImageSrc("/logoImg.png");
        setImageWidth(153);
        setImageHeight(51);
      }
    };
    window.addEventListener("resize", windowResize);
    windowResize();
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              className={styles.logoImg}
              src={imageSrc}
              alt="판다마켓 로고"
              width={imageWidth}
              height={imageHeight}
              priority
            />
          </Link>
        </div>
        <div>
          <Link
            className={
              pathname === "/items" ? styles.inCommunity : styles.community
            }
            href="/community"
          >
            자유게시판
          </Link>
          <Link
            className={pathname === "/market" ? styles.inMarket : styles.market}
            href="/market"
          >
            중고마켓
          </Link>
        </div>
      </div>
      <div className={styles.login}>
        <button className={styles.loginButton}>로그인</button>
      </div>
    </div>
  );
}
