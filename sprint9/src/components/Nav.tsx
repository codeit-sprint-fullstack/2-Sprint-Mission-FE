"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "../styles/Nav.module.css";
import pcLogo from "../../public/assets/pndamarket_logo.png";
import mobileLogo from "../../public/assets/m_pandamarket_logo.png";
import { AuthContext } from "@/src/context/AuthProvider";
import profileImg from "@/public/assets/img_profile.png";
import { usePathname } from "next/navigation";

export default function Nav() {
  const { user } = useContext(AuthContext);
  const currentPathname = usePathname();

  const profileDefaultImg = user?.image ? user.image : profileImg;

  const menuActiveStyle = (location: string): string => {
    return currentPathname?.startsWith(location) ? style.active : "";
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
            href="/items"
            className={`${style.menu} ${menuActiveStyle("/items")}`}
          >
            중고마켓
          </Link>
        </div>
      </div>
      {user ? (
        <div className={style.userInfo}>
          <Image
            src={profileDefaultImg}
            alt="user profile image"
            width={40}
            height={40}
          />
          <span className={style.nickname}>{user.nickname}</span>
        </div>
      ) : (
        <Link href="/login">
          <button className={style.login}>로그인</button>
        </Link>
      )}
    </div>
  );
}
