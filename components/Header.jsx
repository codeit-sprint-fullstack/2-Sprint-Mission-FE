// import React from "react";
import logoImg from "../images/icon/pandalogo.svg";
import userIcon from "../images/etc/userIcon.svg";
import styles from "../components/css/Header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logoImg} alt="판다마켓 로고" />
            </Link>
          </div>
          <div className={styles.board}>
            <span id="free-board">
              <Link href="/board">자유게시판</Link>
            </span>
            <span id="used-market">
              <Link href="/used-market">중고마켓 </Link>
            </span>
          </div>
        </nav>
        <div className={styles.user}>
          <Image src={userIcon} alt="유저 이미지" />
          로그인
        </div>
      </header>
    </>
  );
}
