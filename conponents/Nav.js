import styles from "./Nav.module.css";
import Image from "next/image";
import logo from "@/public/pandamarket_logo.png";
import Link from "next/link";

export default function Nav() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoMenu}>
          <div className={styles.logo}>
            <Image fill priority src={logo} alt="pandamarket logo" />
          </div>
          <div className={styles.menu}>
            <Link className={`${styles.menu}`} href="/freeBoard">
              자유게시판
            </Link>
            <Link className={`${styles.menu}`} href="/marketplace">
              중고마켓
            </Link>
          </div>
        </div>
        <button className={styles.login}>로그인</button>
      </div>
    </>
  );
}
