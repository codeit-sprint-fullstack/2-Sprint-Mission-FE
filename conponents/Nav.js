import styles from "./Nav.module.css";
import Image from "next/image";
import logo from "@/public/pandamarket_logo.svg";
import mobileLogo from "@/public/mobileLogo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();

  function menuActiveStyle(location) {
    return pathname && pathname.startsWith(location) ? styles.active : "";
  }

  useEffect(() => {
    const handleLogoChang = () => {
      setIsMobile(window.innerWidth < 744);
    };

    window.addEventListener("resize", handleLogoChang);

    return () => {
      window.removeEventListener("resize", handleLogoChang);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoMenu}>
          <Link href="/">
            <div className={styles.logo}>
              <Image
                fill
                priority
                src={!isMobile ? logo : mobileLogo}
                alt="pandamarket logo"
              />
            </div>
          </Link>
          <div className={styles.menuList}>
            <Link
              className={`${styles.menu} ${menuActiveStyle("/freeBoard")}`}
              href="/freeBoard"
            >
              자유게시판
            </Link>
            <Link
              className={`${styles.menu} ${menuActiveStyle("/marketplace")}`}
              href="/marketplace"
            >
              중고마켓
            </Link>
          </div>
        </div>
        <Link href="/login">
          <button className={styles.login}>로그인</button>
        </Link>
      </div>
    </>
  );
}
