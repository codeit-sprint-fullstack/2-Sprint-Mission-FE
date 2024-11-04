"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import style from "../styles/Nav.module.css";
import pcLogo from "../../public/assets/pndamarket_logo.png";
import mobileLogo from "../../public/assets/m_pandamarket_logo.png";

export default function Nav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  function menuActiveStyle(location: string): string {
    return pathname && pathname.startsWith(location) ? style.active : "";
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 744);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displayImg = isMobile ? mobileLogo : pcLogo;

  return (
    <div className={style.container}>
      <div className={style.logoMenu}>
        <Image
          priority={true}
          src={displayImg}
          className={style.logo}
          alt="pandamarket logo"
        />
        <div className={style.menus}>
          <Link
            href="/free-board"
            className={`${style.menu} ${menuActiveStyle("/free-board")}`}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={`${style.menu} ${menuActiveStyle("/market")}`}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <Link href="/login">
        <button className={style.login}>로그인</button>
      </Link>
    </div>
  );
}