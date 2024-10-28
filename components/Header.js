import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <header className={styles.header}>
      <div className={styles.headerNav}>
        <Link href="/">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <Link href="/">
          <button
            className={`${styles.freeArticle}${
              isHome ? ` ${styles.active}` : ""
            }`}
          >
            자유게시판
          </button>
        </Link>
        <button className={styles.oldMarket}> 중고마켓 </button>
      </div>
      <p className={styles.login}>로그인</p>
    </header>
  );
}
