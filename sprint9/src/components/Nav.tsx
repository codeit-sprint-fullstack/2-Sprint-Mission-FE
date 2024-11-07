import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "../styles/Nav.module.css";
import pcLogo from "../../public/assets/pndamarket_logo.png";
import mobileLogo from "../../public/assets/m_pandamarket_logo.png";

interface NavProps {
  currentPathname: string;
}

export default function Nav({ currentPathname }: NavProps) {

  const menuActiveStyle = (location: string): string => {
    return currentPathname && currentPathname.startsWith(location)
      ? style.active
      : "";
  };

  return (
    <div className={style.container}>
      <div className={style.logoMenu}>
        <Image
          priority={true}
          src={mobileLogo}
          className={`${style.logo} ${style.mobile}`}
          alt="pandamarket logo"
        />
        <Image
          priority={true}
          src={pcLogo}
          className={`${style.logo} ${style.pc}`}
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
